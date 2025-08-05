export interface MemberFormData {
  // 基本情報
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  zipCode: string;
  address: string;
  bio: string;
  motivation: string;

  // 選択項目
  gender: 'male' | 'female' | 'other' | '';
  ageGroup: '20s' | '30s' | '40s' | '50s' | '60s+' | '';
  occupation: 'student' | 'employee' | 'freelance' | 'other' | '';
  education: 'high_school' | 'university' | 'graduate' | 'other' | '';
  prefecture: string;
  nearestStation: string;
  interests: string[];
  skills: string[];
  certifications: string[];

  // 詳細情報
  hobbies: string[];
  contactTimeSlots: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  specialNotes: string;
  appealPoints: string;
  preferredWorkLocation: string;
  preferredJobType: string;

  // 同意・確認項目
  privacyPolicyAgreed: boolean;
  newsletterSubscribed: boolean;
  additionalRequests: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  id?: string;
  errors?: ValidationErrors;
}

// 選択肢データ
export const PREFECTURES: SelectOption[] = [
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '岩手県', label: '岩手県' },
  { value: '宮城県', label: '宮城県' },
  { value: '秋田県', label: '秋田県' },
  { value: '山形県', label: '山形県' },
  { value: '福島県', label: '福島県' },
  { value: '茨城県', label: '茨城県' },
  { value: '栃木県', label: '栃木県' },
  { value: '群馬県', label: '群馬県' },
  { value: '埼玉県', label: '埼玉県' },
  { value: '千葉県', label: '千葉県' },
  { value: '東京都', label: '東京都' },
  { value: '神奈川県', label: '神奈川県' },
  { value: '新潟県', label: '新潟県' },
  { value: '富山県', label: '富山県' },
  { value: '石川県', label: '石川県' },
  { value: '福井県', label: '福井県' },
  { value: '山梨県', label: '山梨県' },
  { value: '長野県', label: '長野県' },
  { value: '岐阜県', label: '岐阜県' },
  { value: '静岡県', label: '静岡県' },
  { value: '愛知県', label: '愛知県' },
  { value: '三重県', label: '三重県' },
  { value: '滋賀県', label: '滋賀県' },
  { value: '京都府', label: '京都府' },
  { value: '大阪府', label: '大阪府' },
  { value: '兵庫県', label: '兵庫県' },
  { value: '奈良県', label: '奈良県' },
  { value: '和歌山県', label: '和歌山県' },
  { value: '鳥取県', label: '鳥取県' },
  { value: '島根県', label: '島根県' },
  { value: '岡山県', label: '岡山県' },
  { value: '広島県', label: '広島県' },
  { value: '山口県', label: '山口県' },
  { value: '徳島県', label: '徳島県' },
  { value: '香川県', label: '香川県' },
  { value: '愛媛県', label: '愛媛県' },
  { value: '高知県', label: '高知県' },
  { value: '福岡県', label: '福岡県' },
  { value: '佐賀県', label: '佐賀県' },
  { value: '長崎県', label: '長崎県' },
  { value: '熊本県', label: '熊本県' },
  { value: '大分県', label: '大分県' },
  { value: '宮崎県', label: '宮崎県' },
  { value: '鹿児島県', label: '鹿児島県' },
  { value: '沖縄県', label: '沖縄県' },
];

export const STATIONS: SelectOption[] = [
  { value: '新宿駅', label: '新宿駅' },
  { value: '渋谷駅', label: '渋谷駅' },
  { value: '池袋駅', label: '池袋駅' },
  { value: '東京駅', label: '東京駅' },
  { value: '品川駅', label: '品川駅' },
  { value: '上野駅', label: '上野駅' },
  { value: '秋葉原駅', label: '秋葉原駅' },
  { value: '有楽町駅', label: '有楽町駅' },
  { value: '大手町駅', label: '大手町駅' },
  { value: '銀座駅', label: '銀座駅' },
];

export const INTERESTS: SelectOption[] = [
  { value: 'programming', label: 'プログラミング' },
  { value: 'design', label: 'デザイン' },
  { value: 'marketing', label: 'マーケティング' },
  { value: 'business', label: 'ビジネス' },
  { value: 'finance', label: '金融' },
  { value: 'education', label: '教育' },
  { value: 'healthcare', label: 'ヘルスケア' },
  { value: 'sports', label: 'スポーツ' },
  { value: 'music', label: '音楽' },
  { value: 'art', label: 'アート' },
  { value: 'travel', label: '旅行' },
  { value: 'cooking', label: '料理' },
];

export const SKILLS: SelectOption[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'php', label: 'PHP' },
  { value: 'sql', label: 'SQL' },
  { value: 'aws', label: 'AWS' },
  { value: 'docker', label: 'Docker' },
];

export const CERTIFICATIONS: SelectOption[] = [
  { value: 'toeic', label: 'TOEIC' },
  { value: 'toefl', label: 'TOEFL' },
  { value: 'eiken', label: '英検' },
  { value: 'ipa', label: '情報処理技術者試験' },
  { value: 'aws_cert', label: 'AWS認定' },
  { value: 'oracle', label: 'Oracle認定' },
  { value: 'microsoft', label: 'Microsoft認定' },
  { value: 'google', label: 'Google認定' },
];

export const HOBBIES: SelectOption[] = [
  { value: 'reading', label: '読書' },
  { value: 'movies', label: '映画鑑賞' },
  { value: 'music', label: '音楽' },
  { value: 'sports', label: 'スポーツ' },
  { value: 'gaming', label: 'ゲーム' },
  { value: 'cooking', label: '料理' },
  { value: 'travel', label: '旅行' },
  { value: 'photography', label: '写真' },
  { value: 'drawing', label: '絵画' },
  { value: 'gardening', label: 'ガーデニング' },
];

export const CONTACT_TIME_SLOTS: SelectOption[] = [
  { value: 'morning', label: '朝（8:00-12:00）' },
  { value: 'afternoon', label: '午後（12:00-18:00）' },
  { value: 'evening', label: '夕方（18:00-21:00）' },
  { value: 'night', label: '夜（21:00-23:00）' },
  { value: 'weekend', label: '土日' },
];

export const WORK_LOCATIONS: SelectOption[] = [
  { value: 'tokyo', label: '東京' },
  { value: 'osaka', label: '大阪' },
  { value: 'nagoya', label: '名古屋' },
  { value: 'fukuoka', label: '福岡' },
  { value: 'remote', label: 'リモート' },
  { value: 'hybrid', label: 'ハイブリッド' },
];

export const JOB_TYPES: SelectOption[] = [
  { value: 'frontend', label: 'フロントエンド開発' },
  { value: 'backend', label: 'バックエンド開発' },
  { value: 'fullstack', label: 'フルスタック開発' },
  { value: 'mobile', label: 'モバイル開発' },
  { value: 'devops', label: 'DevOps' },
  { value: 'designer', label: 'デザイナー' },
  { value: 'pm', label: 'プロジェクトマネージャー' },
  { value: 'qa', label: 'QAエンジニア' },
];

export interface SingleSelectFieldConfig {
  name: keyof MemberFormData;
  label: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
}

export const SINGLE_SELECT_CONFIGS: SingleSelectFieldConfig[] = [
  {
    name: 'prefecture',
    label: '都道府県',
    options: PREFECTURES,
    required: true,
    placeholder: '都道府県を選択してください'
  },
  {
    name: 'nearestStation',
    label: '最寄り駅',
    options: STATIONS,
    required: true,
    placeholder: '最寄り駅を選択してください'
  },
  {
    name: 'preferredWorkLocation',
    label: '希望勤務地',
    options: WORK_LOCATIONS,
    required: false,
    placeholder: '希望勤務地を選択してください'
  },
  {
    name: 'preferredJobType',
    label: '希望職種',
    options: JOB_TYPES,
    required: false,
    placeholder: '希望職種を選択してください'
  }
];