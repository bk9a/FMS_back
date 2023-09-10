function adviceConfig() {
  this.TextField = "title";
  this.IdField = "id";
  this.Fields = {
    id: { Label: "id" },
    main_file: { Label: "Файл" },
    title: { Label: "Гарчиг" },
    subtitle: { Label: "Товч гарчиг" },

    created_by: { Label: "Үүсгэсэн хэрэглэгч" },
    updated_by: { Label: "Шинэчилсэн хэрэглэгч" },
    created_at: { Label: "Үүсгэсэн огноо" },
    updated_at: { Label: "Шинэчилсэн огноо" },
  };
}

export default adviceConfig;
