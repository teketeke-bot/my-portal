import Link from "next/link";
import { FileCheck2, Scissors, Users } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileCheck2,
    title: "行政手続き・ビザ支援",
    description: "複雑な書類作成や申請手続きを専門家がフルサポート。",
  },
  {
    icon: Scissors,
    title: "日本式技術の専門研修",
    description:
      "日本のサロンで求められるカット・カラー技術を実践的に習得。",
  },
  {
    icon: Users,
    title: "優良サロンとのマッチング",
    description: "外国人採用に積極的な安心できるサロンだけをご紹介。",
  },
];

const steps = [
  {
    step: "Step 1",
    title: "無料登録・オンライン面談",
  },
  {
    step: "Step 2",
    title: "技術チェック・日本式研修の受講",
  },
  {
    step: "Step 3",
    title: "ビザ手続き・サロンでの勤務開始",
  },
];

const faqs = [
  {
    question: "日本語能力試験(JLPT)の資格がなくても登録できますか？",
    answer:
      "はい、登録可能です。ただし就業には一定の日本語力が必要となるため、学習サポートもご案内しています。",
  },
  {
    question: "現在『留学』ビザですが、切り替えはサポートしてもらえますか？",
    answer: "もちろんです。就労可能なビザへの切り替え手続きをサポートいたします。",
  },
];

export default function Home() {
  return (
    <main>
      {/* セクション1: ヒーローエリア */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 px-4 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          日本の美容室で働く夢を、最短で実現。
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          技術研修から複雑なビザ切り替え手続きまで、あなたの日本でのキャリアをトータルサポートします。
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            新規登録を始める
          </Button>
        </Link>
      </section>

      {/* セクション2: 私たちの強み */}
      <section
        id="features"
        className="max-w-7xl mx-auto space-y-8 px-4 py-16 scroll-mt-20"
      >
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          選ばれる3つの理由
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-8 text-blue-600" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* セクション3: ご利用の流れ */}
      <section
        id="flow"
        className="max-w-7xl mx-auto space-y-8 px-4 py-16 scroll-mt-20"
      >
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          就業までのステップ
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center space-y-2">
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {item.step.replace("Step ", "")}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.step}
              </p>
              <p className="font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* セクション4: よくある質問 */}
      <section
        id="faq"
        className="max-w-3xl mx-auto space-y-8 px-4 py-16 scroll-mt-20"
      >
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          よくある質問
        </h2>
        <Accordion>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* セクション5: ボトムCTA */}
      <section className="flex flex-col items-center justify-center space-y-4 px-4 py-16 text-center">
        <Link href="/register">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            新規登録を始める
          </Button>
        </Link>
      </section>
    </main>
  );
}
