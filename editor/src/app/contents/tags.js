const tags = [
  {
    tag: "3dgraphics",
    descr: "application for viewing, creating, or processing 3-d graphics"
  },
  { tag: "accessibility", descr: "accessibility" },
  { tag: "accounting", descr: "accounting software" },
  { tag: "amusement", descr: "a simple amusement" },
  { tag: "archiving", descr: "a tool to archive/backup data" },
  { tag: "art", descr: "software to teach arts" },
  { tag: "artificial-intelligence", descr: "artificial intelligence software" },
  { tag: "backend", descr: "software not meant for end users" },
  { tag: "calculator", descr: "a calculator" },
  { tag: "calendar", descr: "calendar application" },
  { tag: "chat", descr: "a chat client" },
  { tag: "classroom-management", descr: "classroom management software" },
  { tag: "clock", descr: "a clock application/applet" },
  { tag: "content-management", descr: "a content management system (CMS)" },
  { tag: "compression", descr: "a tool to manage compressed data/archives" },
  { tag: "construction", descr: "" },
  { tag: "contact-management", descr: "e.g. an address book" },
  { tag: "database", descr: "application to manage a database" },
  { tag: "debugger", descr: "a tool to debug applications" },
  { tag: "dictionary", descr: "a dictionary" },
  { tag: "documentation", descr: "help or documentation" },
  {
    tag: "electronics",
    descr: "electronics software, e.g. a circuit designer"
  },
  { tag: "email", descr: "email application" },
  {
    tag: "emulator",
    descr: "emulator of another platform, such as a dos emulator"
  },
  { tag: "engineering", descr: "engineering software, e.g. cad programs" },
  { tag: "file-manager", descr: "a file manager" },
  { tag: "file-transfer", descr: "tools like ftp or p2p programs" },
  { tag: "finance", descr: "application to manage your finance" },
  { tag: "flowchart", descr: "a flowchart application" },
  { tag: "gui-designer", descr: "a gui designer application" },
  { tag: "identity", descr: "identity management" },
  { tag: "instant-messaging", descr: "an instant messaging client" },
  { tag: "library", descr: "a library software" },
  { tag: "medical-software", descr: "medical software" },
  {
    tag: "monitor",
    descr: "monitor application/applet that monitors some resource or activity"
  },
  { tag: "museum", descr: "museum software" },
  { tag: "music", descr: "musical software" },
  { tag: "news", descr: "software to manage and publish news" },
  { tag: "ocr", descr: "optical character recognition application" },
  { tag: "parallel-computing", descr: "parallel computing software" },
  { tag: "photography", descr: "camera tools, etc." },
  { tag: "presentation", descr: "presentation software" },
  { tag: "printing", descr: "a tool to manage printers" },
  { tag: "procurement", descr: "software for managing procurement" },
  { tag: "project-management", descr: "project management application" },
  {
    tag: "publishing",
    descr: "desktop publishing applications and color management tools"
  },
  {
    tag: "raster-graphics",
    descr:
      "application for viewing, creating, or processing raster (bitmap) graphics"
  },
  { tag: "remote-access", descr: "a tool to remotely manage your pc" },
  { tag: "revision-control", descr: "applications like git or subversion" },
  { tag: "robotics", descr: "robotics software" },
  { tag: "scanning", descr: "tool to scan a file/text" },
  { tag: "security", descr: "a security tool" },
  { tag: "sports", descr: "sports software" },
  { tag: "spreadsheet", descr: "a spreadsheet" },
  { tag: "telephony", descr: "telephony via pc" },
  { tag: "terminal-emulator", descr: "a terminal emulator application" },
  { tag: "texteditor", descr: "a text editor" },
  { tag: "texttools", descr: "a text tool utility" },
  { tag: "translation", descr: "a translation tool" },
  {
    tag: "vector-graphics",
    descr: "application for viewing, creating, or processing vector graphics"
  },
  { tag: "video-conference", descr: "video conference software" },
  { tag: "viewer", descr: "tool to view e.g. a graphic or pdf file" },
  { tag: "web-browser", descr: "a web browser" },
  {
    tag: "whistleblowing",
    descr: "software for whistleblowing / anticorruption"
  },
  { tag: "word-processor", descr: "a word processor" }
];

export default tags;
export const tag_names = tags.map(t => t.tag);
export const tag_descrs = tags.map(t => t.descr);
