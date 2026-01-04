import { PostTranslationRepository } from "@/src/repositories/postTranslation.repository";
import { translate } from "@/src/lib/translate/libretranslate.service";

export async function getTranslatedPost(
  postId: string,
  text: string,
  language: string
) {
  // 1) Check if already exists
  const cached = await PostTranslationRepository.getPostTranslationById(postId, language);
  
  if (cached) {
    return cached.content;
  }

  // 2) Translate
  const translated = await translate(text, language);

  // 3) Store in cache
  if(translated && translated !== text)
    await PostTranslationRepository.createPostTranslation(postId, language, translated);

  return translated;
}
