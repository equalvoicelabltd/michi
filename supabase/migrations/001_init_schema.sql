-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  country TEXT, -- 'hk', 'tw', 'my', 'th', 'jp'
  preferred_currency TEXT DEFAULT 'HKD',
  preferred_language TEXT DEFAULT 'zh',
  phone_number TEXT,
  phone_country_code TEXT,
  is_buyer BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Buyers (代購買手)
CREATE TABLE buyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  base_location TEXT, -- Primary location in Japan
  active_countries TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['hk', 'tw', etc]
  categories TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['cosmetics', 'fashion', etc]
  languages TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['zh', 'en', 'ja']
  rating FLOAT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  commission_rate DECIMAL DEFAULT 5, -- Default 5%
  pricing_by_currency JSONB, -- {'HKD': 5%, 'TWD': 5%, etc}
  response_time_hours INT DEFAULT 24,
  payment_methods JSONB, -- {hk: ['bank_transfer', 'wechat'], etc}
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Shopping Requests
CREATE TABLE shopping_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES buyers(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_description TEXT,
  estimated_budget DECIMAL,
  budget_currency TEXT,
  deadline TIMESTAMP,
  special_requirements TEXT,
  status TEXT DEFAULT 'pending', -- pending, accepted, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products (日本新商品)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary_zh TEXT, -- Simplified Chinese summary (AI generated)
  summary_zh_CN TEXT, -- Traditional Chinese summary
  summary_en TEXT, -- English summary
  original_language TEXT DEFAULT 'ja',
  source_url TEXT UNIQUE,
  image_url TEXT,
  category TEXT, -- 'cosmetics', 'fashion', etc
  published_at TIMESTAMP,
  estimated_price_jpy DECIMAL,
  estimated_prices JSONB, -- {'HKD': 45.50, 'TWD': 110, etc}
  brand TEXT,
  ai_generated BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations (聊天記錄)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  request_id UUID REFERENCES shopping_requests(id) ON DELETE SET NULL,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  language TEXT, -- Source language
  created_at TIMESTAMP DEFAULT NOW()
);

-- Translation Logs (不存储个人身份，仅用于统计)
CREATE TABLE chat_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  original_text TEXT,
  original_language TEXT,
  translated_text TEXT,
  target_language TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Buyer Reviews
CREATE TABLE buyer_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_helpful BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_reviews ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Public can read verified buyers
CREATE POLICY "Public read verified buyers"
  ON buyers FOR SELECT
  USING (verified = TRUE);

-- Buyers can update their own listings
CREATE POLICY "Buyers update own listings"
  ON buyers FOR UPDATE
  USING (auth.uid() = user_id);

-- Users see own shopping requests
CREATE POLICY "Users see own requests"
  ON shopping_requests FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() IN (SELECT user_id FROM buyers WHERE id = buyer_id));

-- Users see own conversations
CREATE POLICY "Users see own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() IN (SELECT user_id FROM buyers WHERE id = buyer_id));

-- Users can read messages in their conversations
CREATE POLICY "Read own conversation messages"
  ON chat_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE auth.uid() = requester_id OR auth.uid() IN (SELECT user_id FROM buyers WHERE id = buyer_id)
    )
  );

-- Users can insert messages in their conversations
CREATE POLICY "Insert messages in own conversations"
  ON chat_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE auth.uid() = requester_id OR auth.uid() IN (SELECT user_id FROM buyers WHERE id = buyer_id)
    )
  );

-- Public read products (no authentication needed)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_buyers_active_countries ON buyers USING GIN (active_countries);
CREATE INDEX idx_buyers_categories ON buyers USING GIN (categories);
CREATE INDEX idx_buyers_rating ON buyers(rating DESC);
CREATE INDEX idx_shopping_requests_status ON shopping_requests(status);
CREATE INDEX idx_shopping_requests_requester ON shopping_requests(requester_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_published_at ON products(published_at DESC);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_conversations_requester ON conversations(requester_id);
CREATE INDEX idx_conversations_buyer ON conversations(buyer_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buyers_updated_at BEFORE UPDATE ON buyers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
