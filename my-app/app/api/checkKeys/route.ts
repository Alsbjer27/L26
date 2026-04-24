import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEYS = [
  'yh73iabdoa89DsseFLIs3',
  'kon3456263hjopi9',
  'med9h9283jd7UID8',
  'sista7823nd00',
  'hoppla7823nd00',
  'or73F9hyk0s',
  '2or898pjjknas'
];

const ALL_REQUIRED_KEYS = [
  'yh73iabdoa89DsseFLIs3',
  'kon3456263hjopi9',
  'med9h9283jd7UID8',
  'sista7823nd00',
  'hoppla7823nd00',
  'or73F9hyk0s',
  '2or898pjjknas'
];

export async function POST(req: NextRequest) {
  const { foundKeys, checkSingle, checkMultiple, action } = await req.json();
  
  // If action is 'getKeys', return all secret keys
  if (action === 'getKeys') {
    return NextResponse.json({ keys: SECRET_KEYS });
  }
  
  // If checking multiple keys by indices
  if (checkMultiple !== undefined) {
    const allFound = checkMultiple.every((index: number) => 
      foundKeys.includes(SECRET_KEYS[index])
    );
    return NextResponse.json({ isSolved: allFound });
  }
  
  // If checking a single key by index
  if (checkSingle !== undefined) {
    const keyToCheck = SECRET_KEYS[checkSingle];
    const isSolved = foundKeys.includes(keyToCheck);
    return NextResponse.json({ isSolved });
  }
  
  // Otherwise, check all keys
  const isSolvedAll = ALL_REQUIRED_KEYS.every(key => foundKeys.includes(key));
  const isAnySolved = SECRET_KEYS.some(key => foundKeys.includes(key));
  
  return NextResponse.json({ 
    isSolvedAll, 
    isAnySolved 
  });
}