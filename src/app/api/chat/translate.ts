import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Using Google Translate API or similar service
async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string> {
  try {
    // Mock translation for demo
    // In production, use actual translation API like Google Translate
    const response = await fetch('https://api.mymemory.translated.net/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // This is a simple mock - replace with actual Google Translate API
    const langMap: Record<string, Record<string, string>> = {
      'zh-en': { hello: 'Hello', goodbye: 'Goodbye' },
      'en-zh': { hello: '你好', goodbye: '再見' },
      'zh-ja': { hello: 'こんにちは', goodbye: 'さようなら' },
    };

    const key = `${sourceLang}-${targetLang}`;
    return langMap[key]?.[text.toLowerCase()] || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      sourceLanguage,
      targetLanguage,
      conversationId,
    } = await request.json();

    if (!message || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Translate the message
    const translated = await translateText(
      message,
      targetLanguage,
      sourceLanguage
    );

    // Log translation (without personal info)
    if (conversationId) {
      const { error: logError } = await supabase
        .from('chat_translations')
        .insert({
          conversation_id: conversationId,
          original_text: message,
          original_language: sourceLanguage,
          translated_text: translated,
          target_language: targetLanguage,
        });

      if (logError) {
        console.error('Log error:', logError);
      }
    }

    return NextResponse.json({
      original: message,
      translated,
      sourceLanguage,
      targetLanguage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Translate route error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}
