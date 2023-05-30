import deepl
import os
import json

languages_to_translate_to = ["pl", "es", "fr"]

def main():
    auth_key = os.getenv("DEEPL_KEY")

    if auth_key is None:
        print("Please provide a DeepL API key as a 'DEEPL_KEY' environment variable")
        return 
    
    with open("assets/localizations_source.json") as f:
        en_localization = json.load(f)["en"]

    en_localization_list = [el for el in en_localization.values()]

    

    localizations = {
        "en": en_localization
    }

    translator = deepl.Translator(auth_key) 
    for language in languages_to_translate_to:
        results = translator.translate_text(en_localization_list, target_lang=language)
        localizations[language] = {
            key: translation.text
            for key, translation in zip(en_localization.keys(), results)
        }
    
    with open("assets/localizations.json", "w") as f:
        json.dump(localizations, f)
    

if __name__ == "__main__":
    main()