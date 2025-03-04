import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // products 테이블의 현재 최대 id 값을 찾아서 시퀀스를 재설정
    await db.execute(sql`
      SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products), true);
    `);

    return NextResponse.json({ message: '시퀀스가 성공적으로 재설정되었습니다.' });
  } catch (error) {
    console.error('시퀀스 재설정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '시퀀스 재설정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
