"use client";

import { useState } from "react";
import { translatePostAction } from "@/src/lib/posts/actions";
import { Post, User } from "@/src/generated/prisma/client";
import DeletePostButton from "@/src/components/buttons/deletePostButton";
import { getCurrentUser } from "@/src/lib/actions";

export default function PostCard({ post, user, isCurrentUser } : {post : Post, user?: User | null, isCurrentUser?: boolean}) {

  const [language, setLanguage] = useState("es");
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleTranslate() {
    setLoading(true);
    const result = await translatePostAction(post.postId, language);
    setTranslated(result);
    setLoading(false);
  }

  return (
   <article className="card space-y-3">
      <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
        {post.title}
      </h3>

      <p style={{ lineHeight: 1.6 }}>
        {translated ?? post.content}
      </p>

      <small style={{ color: "var(--muted)" }}>
        By {user?.name ?? "Unknown"}
      </small>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginTop: 12,
          flexWrap: "wrap",
        }}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ar">Arabic</option>
          <option value="zh">Chinese</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ko">Korean</option>
          <option value="hi">Hindi</option>
          <option value="tr">Turkish</option>
          <option value="nl">Dutch</option>
          <option value="sv">Swedish</option>
          <option value="pl">Polish</option>
          <option value="uk">Ukrainian</option>
          <option value="el">Greek</option>
          <option value="cs">Czech</option>
          <option value="ro">Romanian</option>
          <option value="da">Danish</option>
          <option value="fi">Finnish</option>
          <option value="id">Indonesian</option>
          <option value="sl">Slovenian</option>
          <option value="ur">Urdu</option>
          <option value="hu">Hungarian</option>
          <option value="ja">Japanese</option>
        </select>

        <button onClick={handleTranslate} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>

        {isCurrentUser && (
          <DeletePostButton
            postId={post.postId}
            className="danger"
          />
        )}
      </div>
    </article>
  );
}
