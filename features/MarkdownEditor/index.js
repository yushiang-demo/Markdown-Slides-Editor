import Icons from "components/Icon";
import dynamic from "next/dynamic";

import { Delete, TextAreaWrapper, Wrapper } from "./styled";

const AceEditor = dynamic(() => import("./AceEditor/index.js"), {
  ssr: false,
});

const TextArea = ({ markdown, onChange }) => {
  return (
    <TextAreaWrapper>
      <AceEditor value={markdown} onChange={onChange} />
      <Delete>
        <Icons.trashcan onClick={() => onChange(null)} />
      </Delete>
    </TextAreaWrapper>
  );
};

const SlidesTextArea = ({ pages, onChange }) => {
  const onPageChange = (id) => {
    return (markdown) => {
      onChange({ id, markdown });
    };
  };

  return (
    <Wrapper>
      {pages.map(({ markdown, id }, index) => (
        <TextArea key={index} markdown={markdown} onChange={onPageChange(id)} />
      ))}
    </Wrapper>
  );
};

export default SlidesTextArea;
