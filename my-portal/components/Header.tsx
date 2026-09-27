import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 max-w-7xl mx-auto items-center justify-between px-6">
        <Link href="/" className="font-bold text-xl">
          美容師支援ポータル
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline"
          >
            サービスについて
          </Link>
          <Link href="/#flow" className="text-sm font-medium hover:underline">
            手続きの流れ
          </Link>
          <Link href="/#faq" className="text-sm font-medium hover:underline">
            よくある質問
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline"
          >
            マイページ
          </Link>
          <Link href="/login">
            <Button variant="outline">ログイン</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
