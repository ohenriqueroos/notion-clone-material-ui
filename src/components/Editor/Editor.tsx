import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import html from "highlight.js/lib/languages/xml";
import ts from "highlight.js/lib/languages/typescript";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatIcon from "@mui/icons-material/Chat";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SaveIcon from "@mui/icons-material/Save";
import MicIcon from "@mui/icons-material/Mic";

import "highlight.js/styles/tokyo-night-dark.css";
import BubbleButton from "./BubbleButton";
import FloatingButton from "./FloatingButton";
import { Box, Button, IconButton, Stack } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("ts", ts);

const Editor = () => {
  const [content, setContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Table.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
  });

  const commands = [
    {
      command: "criar título um",
      callback: () => {
        editor!
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run();
      },
    },
    {
      command: "criar título 2",
      callback: () => {
        editor!
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run();
      },
    },
    {
      command: "criar título 3",
      callback: () => {
        editor!
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .run();
      },
    },
  ];

  const {
    transcript,
    listening,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  console.log(transcript);

  useEffect(() => {
    if (transcript && listening) setContent(transcript);
  }, [transcript, listening]);

  const onTypeTextHandler = () => {
    if (editor) {
      const { tr } = editor.view.state;
      tr.delete(tr.selection.anchor - 1, tr.selection.anchor);
      editor.view.dispatch(tr);
      editor.view.focus();
    }
  };

  const onSaveHandler = () => {
    console.log(editor?.getJSON());
  };

  return (
    <Box py={5} px={15}>
      <Stack direction={"row"} justifyContent={"end"}>
        <Button variant="text" startIcon={<SaveIcon />} onClick={onSaveHandler}>
          Salvar
        </Button>
        <IconButton
          color="primary"
          onClick={() =>
            SpeechRecognition.startListening({ language: "pt-BR" })
          }
        >
          <MicIcon />
        </IconButton>
      </Stack>
      <EditorContent editor={editor} style={{ border: "none" }} />
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;
            return currentLineText === "/";
          }}
        >
          <Stack
            direction={"column"}
            gap={1}
            maxHeight={200}
            sx={{
              backgroundColor: "#333333",
              border: "1px solid #606060",
              borderRadius: "10px",
              overflowY: "auto",
              overflowX: "hidden",
              p: 1,
            }}
          >
            <FloatingButton
              title="Text"
              description="Just start writing with plain text."
              image={<TextFieldsIcon />}
              alt="text"
              onClick={() => {
                editor.chain().focus();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Heading 1"
              description="Big section heading."
              image={<TextFieldsIcon />}
              alt="heading 1"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 1 })
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Heading 2"
              description="Medium section heading."
              image={<TextFieldsIcon />}
              alt="heading 2"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 2 })
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Heading 3"
              description="Small section heading."
              image={<TextFieldsIcon />}
              alt="heading 3"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 3 })
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Ordered list"
              description="Create an ordered list."
              image={<TextFieldsIcon />}
              alt="ordered list"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleOrderedList()
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Bullet list"
              description="Create a bullet list."
              image={<TextFieldsIcon />}
              alt="bullet list"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleBulletList()
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Code"
              description="Capture a code snippet"
              image={<CodeIcon />}
              alt="code"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleCodeBlock()
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Citação"
              description="Capture a quote"
              image={<TextFieldsIcon />}
              alt="quote"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleBlockquote()
                  .run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Citação"
              description="Capture a quote"
              image={<TextFieldsIcon />}
              alt="quote"
              onClick={() => {
                editor.commands.insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: true,
                });
                onTypeTextHandler();
              }}
            />
          </Stack>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
          editor={editor}
        >
          <BubbleButton icon={<ExpandMoreIcon className="w-4 h-4" />}>
            Text
          </BubbleButton>
          <BubbleButton icon={<ChatIcon className="w-4 h-4" />}>
            Comment
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
              }
              data-active={editor.isActive("bold")}
              icon={<FormatBoldIcon className="w-4 h-4" />}
            />
            <BubbleButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
              data-active={editor.isActive("italic")}
              icon={<FormatItalicIcon className="w-4 h-4" />}
            />
            <BubbleButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleStrike()
                  .run()
              }
              data-active={editor.isActive("strike")}
              icon={<FormatStrikethroughIcon className="w-4 h-4" />}
            />
          </div>
        </BubbleMenu>
      )}
    </Box>
  );
};

export default Editor;
