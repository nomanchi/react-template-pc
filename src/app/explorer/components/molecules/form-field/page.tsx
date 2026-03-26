import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { FormFieldDemo } from './_components/FormFieldDemo';

export const metadata: Metadata = { title: 'FormField' };

export default function FormFieldShowcase() {
  return (
    <ShowcasePage
      title="FormField"
      category="Molecules"
      description="Label + Input + 에러 메시지를 하나로 묶은 React Hook Form 통합 폼 필드입니다. register와 error를 직접 전달하면 자동으로 연결됩니다."
    >
      <StorySection title="States — 기본 / 에러 / Helper Text" description="각 상태를 직접 조작해보세요.">
        <FormFieldDemo />
        <CodeBlock code={`// React Hook Form + Zod와 함께 사용
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

<FormField
  label="이메일"
  name="email"
  type="email"
  placeholder="name@example.com"
  register={register('email')}
  error={errors.email}
  required
  helperText="회원가입 시 사용한 이메일을 입력하세요"
/>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'label', type: 'string', required: true, description: '필드 레이블' },
          { name: 'name', type: 'string', required: true, description: 'input name 속성' },
          { name: 'register', type: 'UseFormRegisterReturn', required: true, description: 'RHF register 반환값' },
          { name: 'error', type: 'FieldError', description: 'RHF errors 오브젝트' },
          { name: 'type', type: 'string', default: '"text"', description: 'input type' },
          { name: 'placeholder', type: 'string', description: '플레이스홀더' },
          { name: 'helperText', type: 'string', description: '필드 하단 보조 텍스트' },
          { name: 'required', type: 'boolean', default: 'false', description: '필수 입력 표시 (*)' },
          { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}
