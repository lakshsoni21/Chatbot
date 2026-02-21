import styles from "./style/RightPanel.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Thread({ item }) {
  return (
    <>
      <div className={styles.question}>
        <div className={styles.title}>
          <p>{item.question}</p>
        </div>
      </div>
      {item.isNew ? (
        <>
          <div className={styles.typing}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.answer}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {item.answer}
            </ReactMarkdown>
          </div>
        </>
      )}
    </>
  );
}

export default Thread;
