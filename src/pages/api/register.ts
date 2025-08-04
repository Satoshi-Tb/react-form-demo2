import type { NextApiRequest, NextApiResponse } from 'next';
import { MemberFormData, ApiResponse } from '../../types/member';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const formData: MemberFormData = req.body;

    // ダミーの処理時間をシミュレート
    const delay = Math.random() * 2000 + 500; // 0.5〜2.5秒のランダムな遅延

    setTimeout(() => {
      // ダミーの成功レスポンス
      const response: ApiResponse = {
        success: true,
        message: '会員登録が正常に完了しました',
        id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      // ログに登録データを出力（実際のアプリケーションではデータベースに保存）
      console.log('=== 会員登録データ ===');
      console.log('基本情報:', {
        name: `${formData.lastName} ${formData.firstName}`,
        nameKana: `${formData.lastNameKana} ${formData.firstNameKana}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.zipCode} ${formData.address}`
      });
      console.log('選択項目:', {
        gender: formData.gender,
        ageGroup: formData.ageGroup,
        occupation: formData.occupation,
        education: formData.education,
        prefecture: formData.prefecture,
        nearestStation: formData.nearestStation,
        interests: formData.interests,
        skills: formData.skills,
        certifications: formData.certifications
      });
      console.log('詳細情報:', {
        hobbies: formData.hobbies,
        contactTimeSlots: formData.contactTimeSlots,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone
        },
        preferredWorkLocation: formData.preferredWorkLocation,
        preferredJobType: formData.preferredJobType
      });
      console.log('同意項目:', {
        privacyPolicyAgreed: formData.privacyPolicyAgreed,
        newsletterSubscribed: formData.newsletterSubscribed
      });
      console.log('自由記述:', {
        bio: formData.bio,
        motivation: formData.motivation,
        specialNotes: formData.specialNotes,
        appealPoints: formData.appealPoints,
        additionalRequests: formData.additionalRequests
      });
      console.log('登録ID:', response.id);
      console.log('===================');

      res.status(200).json(response);
    }, delay);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました'
    });
  }
}