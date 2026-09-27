"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressValue } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const documents = [
  {
    name: "在留カードのコピー",
    status: "提出済み",
    submitted: true,
  },
  {
    name: "本国の美容師免許証",
    status: "未提出",
    submitted: false,
  },
  {
    name: "日本語能力試験(JLPT)認定書",
    status: "未提出",
    submitted: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserName(
        (user.user_metadata?.name as string | undefined) ?? user.email ?? null
      );
      setIsLoading(false);
    };

    loadUser();
  }, [router]);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <p className="text-muted-foreground">読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{userName}さん、ようこそ</h1>
        <p className="text-muted-foreground">
          現在の各種手続きの進捗状況です。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>美容師免許切り替え手続き</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={30}>
            <ProgressValue />
          </Progress>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>現在必要なアクション</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              コーディネーターとの初回面談の日程調整をお願いします。
            </p>
            <Button>日程を調整する</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>必要書類の提出状況</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          doc.submitted
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!doc.submitted && (
                        <Button variant="outline" size="sm">
                          アップロード
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
