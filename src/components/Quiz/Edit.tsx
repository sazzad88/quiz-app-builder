import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store, Quiz, Question } from "../../store/types";
import { updateQuiz, sortQuizQuestions } from "../../store/actions";
import { useParams } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";
import ManageQuestion from "./ManageQuestion";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list: Question[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Edit() {
  const dispatch = useDispatch();
  const params = useParams();
  const { quizId } = params as {
    quizId: string;
  };
  const quizList = useSelector((state: Store) => state.quizList);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [title, setTitle] = useState<string>("");
  const [layout, setLayout] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");

  useEffect(() => {
    const found = quizList.find((item: Quiz) => item.id === quizId);

    if (found) {
      setQuiz(found);
      setTitle(found.title);
      setLayout(found.layout);
    }
  }, []);

  const [openQuestion, setOpenQuestion] = useState<Boolean>(false);

  const closeQuestion = (created: boolean) => {
    setOpenQuestion(false);
  };

  const closeQuestionManagement = () => {
    setQuestionId("");
  };

  const handleUpdateQuiz = () => {
    if (title.trim().length < 1) {
      return;
    }

    dispatch(updateQuiz(quizId, title, layout as "single" | "multi"));
  };

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      quiz.items,
      result.source.index,
      result.destination.index
    );

    // console.log(items);

    dispatch(sortQuizQuestions(quizId, items));
  };

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#f9f7f7" : "",
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer

    background: isDragging ? "#acdafb" : "#f9f7f7",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          {quiz.id ? (
            <>
              <div
                className="field is-grouped"
                style={{ justifyContent: "flex-end" }}
              >
                <div className="control">
                  <button
                    className="button is-link is-small"
                    onClick={handleUpdateQuiz}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="field is-small">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input is-small"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Quiz title"
                  />
                </div>
              </div>

              <div className="field is-small">
                <label className="label is-small">Quiz Template</label>
                <div className="control">
                  <div className="select is-small">
                    <select
                      value={layout}
                      onChange={(e) => {
                        setLayout(e.target.value);
                      }}
                    >
                      <option value="single">
                        All question visible at a time
                      </option>
                      <option value="multi">
                        One quesiton visible at a time
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="card-content mt-20">
        <div className="content">
          {quiz.id ? (
            <>
              {quiz.items.length === 0 ? (
                <div className="notification">
                  Please add some quesitons to your quiz and make it interesting
                </div>
              ) : (
                <>
                  <div className="columns">
                    <div className="column is-4">
                      <abbr title="Question">Question</abbr>
                    </div>
                    <div className="column is-2 has-text-centered">
                      <abbr title="Type">Type</abbr>
                    </div>
                    <div className="column is-2 has-text-centered">
                      <abbr title="Type">Options</abbr>
                    </div>
                    <div className="column is-2 has-text-centered">
                      <abbr title="Points">Points</abbr>
                    </div>
                    <div className="column is-2 has-text-centered"></div>
                  </div>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {quiz.items.map(
                            (quesiton: Question, index: number) => (
                              <Draggable
                                key={quesiton.id}
                                draggableId={quesiton.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className="columns"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <div className="column is-4">
                                      {quesiton.text}
                                    </div>
                                    <div className="column is-2 has-text-centered">
                                      {quesiton.optionType === "multiple" ? (
                                        <span className="tag is-black">
                                          Multiple
                                        </span>
                                      ) : (
                                        <span className="tag is-link">
                                          Single
                                        </span>
                                      )}
                                    </div>
                                    <div className="column is-2 has-text-centered">
                                      {quesiton.options.length}
                                    </div>
                                    <div className="column is-2 has-text-centered">
                                      {quesiton.points}
                                    </div>
                                    <div className="column is-2 has-text-centered">
                                      <button
                                        className="button is-small is-success"
                                        onClick={() =>
                                          setQuestionId(quesiton.id)
                                        }
                                      >
                                        Manage
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </>
              )}

              {questionId !== "" ? (
                <ManageQuestion
                  questionId={questionId}
                  quizId={quizId}
                  closeModal={closeQuestionManagement}
                />
              ) : null}

              {openQuestion ? (
                <CreateQuestion quizId={quizId} closeQuestion={closeQuestion} />
              ) : (
                <div
                  className="field is-grouped mt-50"
                  style={{ justifyContent: "flex-end" }}
                >
                  <div className="control">
                    <button
                      className="button is-link is-small"
                      onClick={() => setOpenQuestion(true)}
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Edit;
