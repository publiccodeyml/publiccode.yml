import StringWidget from "./StringWidget";
import TextareaWidget from "./TextareaWidget";
import EmailWidget from "./EmailWidget";
import NumberWidget from "./NumberWidget";
import MoneyWidget from "./MoneyWidget";
import PercentWidget from "./PercentWidget";
import ArrayWidget from "./ArrayWidget";
import CheckboxWidget from "./CheckboxWidget";
import ObjectWidget from "./ObjectWidget";
import PasswordWidget from "./PasswordWidget";
import SearchWidget from "./SearchWidget";
import UrlWidget from "./UrlWidget";
import ColorWidget from "./ColorWidget";
import ChoiceWidget from "./ChoiceWidget";
import ChoiceExpandedWidget from "./ChoiceExpandedWidget";
import ChoiceMultipleExpandedWidget from "./ChoiceMultipleExpandedWidget";
import DateWidget from "./DateWidget";
import TimeWidget from "./TimeWidget";
import DateTimeWidget from "./DateTimeWidget";
import CompatibleDateWidget from "./CompatibleDateWidget";
import CompatibleDateTimeWidget from "./CompatibleDateTimeWidget";
import FileWidget from "./FileWidget";
import OneOfChoiceWidget from "./oneOfChoiceWidget";
import EditorWidget from "./EditorWidget";

export default {
  object: ObjectWidget,
  string: StringWidget,
  textarea: TextareaWidget,
  email: EmailWidget,
  integer: NumberWidget,
  number: NumberWidget,
  money: MoneyWidget,
  percent: PercentWidget,
  array: ArrayWidget,
  boolean: CheckboxWidget,
  password: PasswordWidget,
  search: SearchWidget,
  url: UrlWidget,
  color: ColorWidget,
  choice: ChoiceWidget,
  "choice-expanded": ChoiceExpandedWidget,
  "choice-multiple-expanded": ChoiceMultipleExpandedWidget,
  date: DateWidget,
  datetime: DateTimeWidget,
  time: TimeWidget,
  "compatible-date": CompatibleDateWidget,
  "compatible-datetime": CompatibleDateTimeWidget,
  file: FileWidget,
  oneOf: OneOfChoiceWidget,
  editor: EditorWidget
};
