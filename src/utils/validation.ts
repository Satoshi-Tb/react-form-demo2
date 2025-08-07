import { MemberFormData, ValidationErrors } from "../types/member";

export const validateMemberForm = (data: MemberFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // 基本情報 - 必須チェック
  if (!data.lastName.trim()) {
    errors.lastName = "姓は必須です";
  }
  if (!data.firstName.trim()) {
    errors.firstName = "名は必須です";
  }
  if (!data.lastNameKana.trim()) {
    errors.lastNameKana = "フリガナ（姓）は必須です";
  }
  if (!data.firstNameKana.trim()) {
    errors.firstNameKana = "フリガナ（名）は必須です";
  }
  if (!data.email.trim()) {
    errors.email = "メールアドレスは必須です";
  }
  if (!data.phone.trim()) {
    errors.phone = "電話番号は必須です";
  }
  if (!data.zipCode.trim()) {
    errors.zipCode = "郵便番号は必須です";
  }
  if (!data.address.trim()) {
    errors.address = "住所は必須です";
  }
  if (!data.motivation.trim()) {
    errors.motivation = "志望動機は必須です";
  }

  // 選択項目 - 必須チェック
  if (!data.gender) {
    errors.gender = "性別は必須です";
  }
  if (!data.ageGroup) {
    errors.ageGroup = "年代は必須です";
  }
  if (!data.occupation) {
    errors.occupation = "職業は必須です";
  }
  if (!data.education) {
    errors.education = "学歴は必須です";
  }
  if (!data.prefecture.trim()) {
    errors.prefecture = "都道府県は必須です";
  }
  if (!data.nearestStation.trim()) {
    errors.nearestStation = "最寄り駅は必須です";
  }
  if (data.interests.length === 0) {
    errors.interests = "興味のある分野を1つ以上選択してください";
  }

  // 詳細情報 - 必須チェック
  if (!data.emergencyContactName.trim()) {
    errors.emergencyContactName = "緊急連絡先名は必須です";
  }
  if (!data.emergencyContactPhone.trim()) {
    errors.emergencyContactPhone = "緊急連絡先電話番号は必須です";
  }

  // 同意・確認項目 - 必須チェック
  if (!data.privacyPolicyAgreed) {
    errors.privacyPolicyAgreed = "プライバシーポリシーへの同意は必須です";
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
