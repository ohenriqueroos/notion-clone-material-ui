import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { initialContent } from "./initialContent";
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

import "highlight.js/styles/tokyo-night-dark.css";
import BubbleButton from "./BubbleButton";
import FloatingButton from "./FloatingButton";
import { Box, Button, Stack } from "@mui/material";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("ts", ts);

const Editor = () => {
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
    content: initialContent,
  });

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
      <Stack alignItems={"end"}>
        <Button variant="text" startIcon={<SaveIcon />} onClick={onSaveHandler}>
          Salvar
        </Button>
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
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Heading 2"
              description="Medium section heading."
              image={<TextFieldsIcon />}
              alt="heading 2"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Heading 3"
              description="Small section heading."
              image={<TextFieldsIcon />}
              alt="heading 3"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Ordered list"
              description="Create an ordered list."
              image={<TextFieldsIcon />}
              alt="ordered list"
              onClick={() => {
                editor.chain().focus().toggleOrderedList().run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Bullet list"
              description="Create a bullet list."
              image={<TextFieldsIcon />}
              alt="bullet list"
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Code"
              description="Capture a code snippet"
              image={<CodeIcon />}
              alt="code"
              onClick={() => {
                editor.chain().focus().toggleCodeBlock().run();
                onTypeTextHandler();
              }}
            />

            <FloatingButton
              title="Citação"
              description="Capture a quote"
              image={<TextFieldsIcon />}
              alt="quote"
              onClick={() => {
                editor.chain().focus().toggleBlockquote().run();
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
          <BubbleButton>
            Text
            <ExpandMoreIcon className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton>
            Comment
            <ChatIcon className="w-4 h-4" />
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <FormatBoldIcon className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <FormatItalicIcon className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <FormatStrikethroughIcon className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              data-active={editor.isActive("codeBlock")}
            >
              <CodeIcon className="w-4 h-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </Box>
  );
};

export default Editor;
