"use client";
import React, { useState } from "react";
import InputText from "@/components/InputText";
import ButtonAdd from "@/components/ButtonAdd";
import { createTask } from "@/services/api";
import TopBarAdd from "@/components/TopBarAdd";

export default function Add() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleAddTask = async () => {
    if (!title || !detail) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await createTask({
        title_text: title,
        detail_text: detail,
      });
      setTitle("");
      setDetail("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TopBarAdd />
      <InputText
        onTitleChange={setTitle}
        onDetailChange={setDetail}
        titleValue={title}
        detailValue={detail}
      />
      <ButtonAdd onClick={handleAddTask} />
    </div>
  );
}