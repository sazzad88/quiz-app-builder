## Quiz App Builder

There will be two views of the application. Dashboard view for quiz creator and a visitor view.

## Requirements

**Dashboard:**

1.  The homepage shows a list of all quizzes .
2.  User create a new quiz providing a quiz title and its questions and answers (A quiz can have multiple questions and answers).  
    For example:
    1.  Title: Quiz 1
        \=> Question 1  
         Answer 1  
         Answer 2  
         Answer 3
        \=> Question 2  
         Answer 1  
         Answer 2  
         Answer 3
        \=> Question 3  
         Answer 1  
         Answer 2  
         Answer 3
        So on...
3.  User can add text and optionally an image to the quiz questions. No file upload, just adding images by URL.
4.  Based on the question type, user can add his/her options/choices for the answer.
    1.  single selection, multiple selections
    2.  checkbox with the option input to mark it/them as a correct answer(s).
    3.  Each option contains a text and optionally an image
    4.  An input field to add points for correct answers.
    5.  User is allowed to add as many options as he can.
5.  Has option to set quiz layout eg: one question per page or all questions on the same page.
6.  The questions are sortable by dragging up and down
7.  User can edit the questions/answers/points/quiz title

**Quiz View**

1.  Visiting a view URL (\`/quiz/{quizId}\`)
2.  The layout can be either all questions on a single page or one question per page based on the config you stored while making the quiz.
3.  User can see his score at the end of answering all questions.
