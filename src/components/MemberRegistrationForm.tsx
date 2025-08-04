import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import Select from 'react-select';
import {
  MemberFormData,
  ValidationErrors,
  PREFECTURES,
  STATIONS,
  INTERESTS,
  SKILLS,
  CERTIFICATIONS,
  HOBBIES,
  CONTACT_TIME_SLOTS,
  WORK_LOCATIONS,
  JOB_TYPES,
  SelectOption,
} from '../types/member';
import { validateMemberForm, hasValidationErrors } from '../utils/validation';

const initialFormData: MemberFormData = {
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  email: '',
  phone: '',
  zipCode: '',
  address: '',
  bio: '',
  motivation: '',
  gender: '',
  ageGroup: '',
  occupation: '',
  education: '',
  prefecture: '',
  nearestStation: '',
  interests: [],
  skills: [],
  certifications: [],
  hobbies: [],
  contactTimeSlots: [],
  emergencyContactName: '',
  emergencyContactPhone: '',
  specialNotes: '',
  appealPoints: '',
  preferredWorkLocation: '',
  preferredJobType: '',
  privacyPolicyAgreed: false,
  newsletterSubscribed: false,
  additionalRequests: '',
};

const MemberRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof MemberFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? (event.target as HTMLInputElement).checked 
      : event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (field: keyof MemberFormData) => (selectedOptions: SelectOption | readonly SelectOption[] | null) => {
    let value;
    if (Array.isArray(selectedOptions)) {
      value = selectedOptions.map((option: SelectOption) => option.value);
    } else if (selectedOptions && !Array.isArray(selectedOptions)) {
      value = (selectedOptions as SelectOption).value;
    } else {
      value = Array.isArray(formData[field]) ? [] : '';
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxGroupChange = (field: keyof MemberFormData, value: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValues = formData[field] as string[];
    let newValues;
    
    if (event.target.checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: newValues
    }));

    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const validationErrors = validateMemberForm(formData);
    
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      // エラーがある場合、最初のエラーフィールドにスクロール
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        // フォームをリセット
        setFormData(initialFormData);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message || '登録に失敗しました' });
        }
      }
    } catch {
      setErrors({ general: 'ネットワークエラーが発生しました' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectValue = (field: keyof MemberFormData, options: SelectOption[]) => {
    const value = formData[field];
    if (Array.isArray(value)) {
      return options.filter(option => value.includes(option.value));
    } else if (value) {
      return options.find(option => option.value === value) || null;
    }
    return null;
  };

  if (submitSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            登録完了
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            会員登録が正常に完了しました。ありがとうございます。
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setSubmitSuccess(false)}
          >
            新規登録
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          会員登録フォーム
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          すべての必須項目をご入力ください
        </Typography>

        {errors.general && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.general}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* 基本情報セクション */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
            基本情報
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <TextField
              name="lastName"
              label="姓"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
              fullWidth
            />
            <TextField
              name="firstName"
              label="名"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
              fullWidth
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <TextField
              name="lastNameKana"
              label="フリガナ（姓）"
              value={formData.lastNameKana}
              onChange={handleInputChange('lastNameKana')}
              error={!!errors.lastNameKana}
              helperText={errors.lastNameKana}
              required
              fullWidth
            />
            <TextField
              name="firstNameKana"
              label="フリガナ（名）"
              value={formData.firstNameKana}
              onChange={handleInputChange('firstNameKana')}
              error={!!errors.firstNameKana}
              helperText={errors.firstNameKana}
              required
              fullWidth
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <TextField
              name="email"
              label="メールアドレス"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              required
              fullWidth
            />
            <TextField
              name="phone"
              label="電話番号"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              fullWidth
            />
          </Box>

          <TextField
            name="zipCode"
            label="郵便番号"
            value={formData.zipCode}
            onChange={handleInputChange('zipCode')}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            required
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            name="address"
            label="住所"
            multiline
            rows={2}
            value={formData.address}
            onChange={handleInputChange('address')}
            error={!!errors.address}
            helperText={errors.address}
            required
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            name="bio"
            label="自己紹介"
            multiline
            rows={3}
            value={formData.bio}
            onChange={handleInputChange('bio')}
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            name="motivation"
            label="志望動機"
            multiline
            rows={3}
            value={formData.motivation}
            onChange={handleInputChange('motivation')}
            error={!!errors.motivation}
            helperText={errors.motivation}
            required
            fullWidth
            sx={{ mb: 3 }}
          />

          {/* 選択項目セクション */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
            選択項目
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FormControl error={!!errors.gender} sx={{ mb: 3 }}>
            <FormLabel component="legend">性別 *</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleInputChange('gender')}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="男性" />
              <FormControlLabel value="female" control={<Radio />} label="女性" />
              <FormControlLabel value="other" control={<Radio />} label="その他" />
            </RadioGroup>
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender}
              </Typography>
            )}
          </FormControl>

          <FormControl error={!!errors.ageGroup} sx={{ mb: 3 }}>
            <FormLabel component="legend">年代 *</FormLabel>
            <RadioGroup
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange('ageGroup')}
              row
            >
              <FormControlLabel value="20s" control={<Radio />} label="20代" />
              <FormControlLabel value="30s" control={<Radio />} label="30代" />
              <FormControlLabel value="40s" control={<Radio />} label="40代" />
              <FormControlLabel value="50s" control={<Radio />} label="50代" />
              <FormControlLabel value="60s+" control={<Radio />} label="60代以上" />
            </RadioGroup>
            {errors.ageGroup && (
              <Typography variant="caption" color="error">
                {errors.ageGroup}
              </Typography>
            )}
          </FormControl>

          <FormControl error={!!errors.occupation} sx={{ mb: 3 }}>
            <FormLabel component="legend">職業 *</FormLabel>
            <RadioGroup
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange('occupation')}
              row
            >
              <FormControlLabel value="student" control={<Radio />} label="学生" />
              <FormControlLabel value="employee" control={<Radio />} label="会社員" />
              <FormControlLabel value="freelance" control={<Radio />} label="フリーランス" />
              <FormControlLabel value="other" control={<Radio />} label="その他" />
            </RadioGroup>
            {errors.occupation && (
              <Typography variant="caption" color="error">
                {errors.occupation}
              </Typography>
            )}
          </FormControl>

          <FormControl error={!!errors.education} sx={{ mb: 3 }}>
            <FormLabel component="legend">学歴 *</FormLabel>
            <RadioGroup
              name="education"
              value={formData.education}
              onChange={handleInputChange('education')}
              row
            >
              <FormControlLabel value="high_school" control={<Radio />} label="高校卒業" />
              <FormControlLabel value="university" control={<Radio />} label="大学卒業" />
              <FormControlLabel value="graduate" control={<Radio />} label="大学院卒業" />
              <FormControlLabel value="other" control={<Radio />} label="その他" />
            </RadioGroup>
            {errors.education && (
              <Typography variant="caption" color="error">
                {errors.education}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              都道府県 *
            </Typography>
            <Select
              name="prefecture"
              options={PREFECTURES}
              value={getSelectValue('prefecture', PREFECTURES)}
              onChange={handleSelectChange('prefecture')}
              placeholder="都道府県を選択してください"
              isClearable
            />
            {errors.prefecture && (
              <Typography variant="caption" color="error">
                {errors.prefecture}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              最寄り駅 *
            </Typography>
            <Select
              name="nearestStation"
              options={STATIONS}
              value={getSelectValue('nearestStation', STATIONS)}
              onChange={handleSelectChange('nearestStation')}
              placeholder="最寄り駅を選択してください"
              isClearable
            />
            {errors.nearestStation && (
              <Typography variant="caption" color="error">
                {errors.nearestStation}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              興味のある分野 * (複数選択可)
            </Typography>
            <Select
              name="interests"
              options={INTERESTS}
              value={getSelectValue('interests', INTERESTS)}
              onChange={handleSelectChange('interests')}
              placeholder="興味のある分野を選択してください"
              isMulti
            />
            {errors.interests && (
              <Typography variant="caption" color="error">
                {errors.interests}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              スキル (複数選択可)
            </Typography>
            <Select
              name="skills"
              options={SKILLS}
              value={getSelectValue('skills', SKILLS)}
              onChange={handleSelectChange('skills')}
              placeholder="スキルを選択してください"
              isMulti
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              資格 (複数選択可)
            </Typography>
            <Select
              name="certifications"
              options={CERTIFICATIONS}
              value={getSelectValue('certifications', CERTIFICATIONS)}
              onChange={handleSelectChange('certifications')}
              placeholder="資格を選択してください"
              isMulti
            />
          </Box>

          {/* 詳細情報セクション */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
            詳細情報
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FormControl sx={{ mb: 3 }}>
            <FormLabel component="legend">趣味 (複数選択可)</FormLabel>
            <FormGroup row>
              {HOBBIES.map((hobby) => (
                <FormControlLabel
                  key={hobby.value}
                  control={
                    <Checkbox
                      checked={formData.hobbies.includes(hobby.value)}
                      onChange={handleCheckboxGroupChange('hobbies', hobby.value)}
                    />
                  }
                  label={hobby.label}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel component="legend">連絡希望時間帯 (複数選択可)</FormLabel>
            <FormGroup row>
              {CONTACT_TIME_SLOTS.map((slot) => (
                <FormControlLabel
                  key={slot.value}
                  control={
                    <Checkbox
                      checked={formData.contactTimeSlots.includes(slot.value)}
                      onChange={handleCheckboxGroupChange('contactTimeSlots', slot.value)}
                    />
                  }
                  label={slot.label}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <TextField
              name="emergencyContactName"
              label="緊急連絡先名"
              value={formData.emergencyContactName}
              onChange={handleInputChange('emergencyContactName')}
              error={!!errors.emergencyContactName}
              helperText={errors.emergencyContactName}
              required
              fullWidth
            />
            <TextField
              name="emergencyContactPhone"
              label="緊急連絡先電話番号"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange('emergencyContactPhone')}
              error={!!errors.emergencyContactPhone}
              helperText={errors.emergencyContactPhone}
              required
              fullWidth
            />
          </Box>

          <TextField
            name="specialNotes"
            label="特記事項"
            multiline
            rows={3}
            value={formData.specialNotes}
            onChange={handleInputChange('specialNotes')}
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            name="appealPoints"
            label="アピールポイント"
            multiline
            rows={3}
            value={formData.appealPoints}
            onChange={handleInputChange('appealPoints')}
            fullWidth
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              希望勤務地
            </Typography>
            <Select
              name="preferredWorkLocation"
              options={WORK_LOCATIONS}
              value={getSelectValue('preferredWorkLocation', WORK_LOCATIONS)}
              onChange={handleSelectChange('preferredWorkLocation')}
              placeholder="希望勤務地を選択してください"
              isClearable
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              希望職種
            </Typography>
            <Select
              name="preferredJobType"
              options={JOB_TYPES}
              value={getSelectValue('preferredJobType', JOB_TYPES)}
              onChange={handleSelectChange('preferredJobType')}
              placeholder="希望職種を選択してください"
              isClearable
            />
          </Box>

          {/* 同意・確認項目セクション */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
            同意・確認項目
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FormControl error={!!errors.privacyPolicyAgreed} sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="privacyPolicyAgreed"
                  checked={formData.privacyPolicyAgreed}
                  onChange={handleInputChange('privacyPolicyAgreed')}
                />
              }
              label="プライバシーポリシーに同意する *"
            />
            {errors.privacyPolicyAgreed && (
              <Typography variant="caption" color="error">
                {errors.privacyPolicyAgreed}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletterSubscribed"
                  checked={formData.newsletterSubscribed}
                  onChange={handleInputChange('newsletterSubscribed')}
                />
              }
              label="メルマガ配信を希望する"
            />
          </FormControl>

          <TextField
            name="additionalRequests"
            label="その他要望・質問"
            multiline
            rows={3}
            value={formData.additionalRequests}
            onChange={handleInputChange('additionalRequests')}
            fullWidth
            sx={{ mb: 4 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ minWidth: 200, py: 1.5 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  登録中...
                </>
              ) : (
                '登録する'
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MemberRegistrationForm;