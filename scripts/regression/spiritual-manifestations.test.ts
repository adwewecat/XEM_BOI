import assert from 'node:assert';
import {
  SPIRITUAL_INTERVAL_MS,
  SPIRITUAL_DISPLAY_DURATION_MS,
  SPIRITUAL_MANIFESTATIONS,
  createSpiritualManifestationDeck,
  type SpiritualCategory,
} from '../../lib/metaphysics/spiritualManifestations';

console.log('Testing Spiritual Manifestations (240s Non-Repeating Random Deck)...');

// 1. Kiểm tra chu kỳ hiển thị chuẩn 5 giây (5,000 ms) ở chế độ test nhanh
assert.strictEqual(
  SPIRITUAL_INTERVAL_MS,
  5_000,
  `Chu kỳ hiển linh test mặc định phải đúng 5,000ms (5s), nhận được: ${SPIRITUAL_INTERVAL_MS}`
);
assert.strictEqual(
  SPIRITUAL_DISPLAY_DURATION_MS >= 4000 && SPIRITUAL_DISPLAY_DURATION_MS <= 10000,
  true,
  'Thời lượng hiển thị mỗi linh tượng phải từ 4s đến 10s để đủ chiêm ngưỡng animation'
);

// 2. Kiểm tra số lượng linh tượng phong phú (>= 24 linh tượng) và không trùng ID/Title
assert.strictEqual(
  SPIRITUAL_MANIFESTATIONS.length >= 24,
  true,
  `Cần tối thiểu 24 linh tượng tâm linh đa dạng, hiện có: ${SPIRITUAL_MANIFESTATIONS.length}`
);

const idSet = new Set(SPIRITUAL_MANIFESTATIONS.map(item => item.id));
assert.strictEqual(
  idSet.size,
  SPIRITUAL_MANIFESTATIONS.length,
  'Tất cả ID linh tượng phải hoàn toàn duy nhất'
);

// 3. Kiểm tra độ phủ đầy đủ các nhóm tâm linh theo yêu cầu: Đạo Bùa, Sao Tinh Tú, 12 Con Giáp, Bát Quái, Tứ Linh Ấn Triện, Ngũ Hành
const requiredCategories: SpiritualCategory[] = [
  'talisman',
  'constellation',
  'zodiac',
  'bagua',
  'sacred_beast',
  'five_elements',
];

for (const category of requiredCategories) {
  const count = SPIRITUAL_MANIFESTATIONS.filter(item => item.category === category).length;
  assert.strictEqual(
    count >= 3,
    true,
    `Nhóm linh tượng '${category}' phải có ít nhất 3 biến thể khác nhau, hiện có: ${count}`
  );
}

// 4. Kiểm tra thuật toán Shuffle Bag: Rút hết 1 vòng (N lần) KHÔNG BAO GIỜ TRÙNG LẶP bất kỳ linh tượng nào
const deck = createSpiritualManifestationDeck();
const totalCount = SPIRITUAL_MANIFESTATIONS.length;
const firstCycleIds = new Set<string>();
let prevItem = null;

for (let i = 0; i < totalCount; i++) {
  const item = deck.next();
  assert.strictEqual(
    firstCycleIds.has(item.id),
    false,
    `Linh tượng '${item.id}' bị lặp lại ở lần rút thứ ${i + 1}/${totalCount} trong cùng 1 chu kỳ!`
  );
  firstCycleIds.add(item.id);
  prevItem = item;
}

assert.strictEqual(
  firstCycleIds.size,
  totalCount,
  'Sau 1 vòng rút đầy đủ, phải xuất hiện đủ 100% các linh tượng trong kho'
);

// 5. Kiểm tra rút liên tiếp 200 lần qua nhiều chu kỳ xáo bài: Không bao giờ trùng 2 cái liên tiếp (kể cả điểm giao chu kỳ)
for (let i = 0; i < 200; i++) {
  const nextItem = deck.next();
  if (prevItem) {
    assert.notStrictEqual(
      nextItem.id,
      prevItem.id,
      `Không được phép xuất hiện 2 linh tượng trùng nhau liên tiếp tại bước ${i}: ${ nextItem.id }`
    );
  }
  prevItem = nextItem;
}

console.log('✅ ALL SPIRITUAL MANIFESTATION TESTS PASSED!');

