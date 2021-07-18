import React, { useState } from "react";
import { Option } from "../../store/types";

import { confirmAlert } from "react-confirm-alert";

const QuestionOption = ({
  option,
  correctAnswers,
  updateOption,
  handleOptionDelete,
}: {
  option: Option;
  correctAnswers: string[];
  updateOption: (
    optionId: string,
    text: string,
    imageUrl: string,
    isSelected: string
  ) => void;
  handleOptionDelete: (optionId: string) => void;
}) => {
  const [text, setText] = useState<string>(option.text);
  const [imageUrl, setImageUrl] = useState<string>(option.imageUrl!);
  const [answer, setAnswer] = useState<string>(option.id);
  const [currentAnswers, setCurrentAnswers] =
    useState<string[]>(correctAnswers);
  const [error, setError] = useState<{
    text: boolean;
  }>({ text: false });

  const handleOptionUpdate = () => {
    if (text.trim().length < 1) {
      setError({ ...error, text: true });
      return;
    }

    updateOption(option.id, text.trim(), imageUrl.trim(), answer);
  };

  console.log({ currentAnswers });

  return (
    <tr key={option.id}>
      <td>
        <input
          className="input is-small"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError({ text: false });
          }}
        />
      </td>
      <td>
        <input
          className="input is-small"
          value={imageUrl}
          placeholder="https://image.com"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </td>
      <td className="has-text-centered">
        <input
          type="checkbox"
          checked={currentAnswers.includes(option.id)}
          value={answer}
          onChange={(e) => {
            console.log(e.target.checked);
            if (!e.target.checked)
              setCurrentAnswers(
                currentAnswers.filter((item) => item !== option.id)
              );
            else setCurrentAnswers([...currentAnswers, option.id]);
            setAnswer(e.target.checked ? e.target.value : "");
          }}
        />
      </td>

      <td className="has-text-centered">
        <button
          style={{ marginRight: "10px" }}
          className="button is-small is-info"
          onClick={handleOptionUpdate}
        >
          Update
        </button>
        <button
          className="button is-small is-danger"
          onClick={() => {
            confirmAlert({
              title: "Confirm to delete",
              message: "Are you sure to delete this option",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => handleOptionDelete(option.id),
                },
                {
                  label: "No",
                  onClick: () => {},
                },
              ],
            });
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default QuestionOption;
