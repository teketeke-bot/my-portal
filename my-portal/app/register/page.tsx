"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const visaOptions = ["留学", "ワーキングホリデー", "配偶者", "その他"] as const;
const japaneseLevelOptions = ["N1", "N2", "N3", "N4以下"] as const;

const registerSchema = z.object({
  name: z.string().min(1, "氏名を入力してください。"),
  email: z.string().email("正しいメールアドレスを入力してください。"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください。"),
  nationality: z.string().min(1, "国籍を入力してください。"),
  visaStatus: z.enum(visaOptions, {
    message: "在留資格を選択してください。",
  }),
  japaneseLevel: z.enum(japaneseLevelOptions, {
    message: "日本語レベルを選択してください。",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      nationality: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitError(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
          nationality: values.nationality,
          visaStatus: values.visaStatus,
          japaneseLevel: values.japaneseLevel,
        },
      },
    });

    if (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>アカウント作成</CardTitle>
          <CardDescription>
            美容師としてのキャリアを日本でスタートさせるための第一歩です。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {submitError && (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}

              <Field>
                <FieldLabel htmlFor="name">氏名</FieldLabel>
                <Input id="name" {...register("name")} />
                <FieldError errors={[errors.name]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">パスワード</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <FieldError errors={[errors.password]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="nationality">国籍</FieldLabel>
                <Input id="nationality" {...register("nationality")} />
                <FieldError errors={[errors.nationality]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="visaStatus">
                  現在の在留資格 / ビザ
                </FieldLabel>
                <Controller
                  name="visaStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="visaStatus" className="w-full">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {visaOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.visaStatus]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="japaneseLevel">日本語レベル</FieldLabel>
                <Controller
                  name="japaneseLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="japaneseLevel" className="w-full">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {japaneseLevelOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.japaneseLevel]} />
              </Field>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "処理中..." : "登録して次へ進む"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                すでにアカウントをお持ちですか？{" "}
                <Link href="/login" className="text-primary hover:underline">
                  ログイン
                </Link>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
