import styles from "./style/RightPanel.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TypewriterMarkdown from "./TypewriterMarkdown";

function Thread({ item, onTypewriterDone }) {
  console.log(item);

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
      ) : item.typewriter ? (
        <>
          <div className={styles.answer}>
            <TypewriterMarkdown
              text={item.answer}
              onDone={() => onTypewriterDone(item.id)}
            />
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
