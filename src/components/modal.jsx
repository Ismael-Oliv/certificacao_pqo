import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FiXCircle } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function Modal({ show, onClose, data, course }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    console.log(course);
  }, [data, course]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      show ? (
        <div className={styles.Container}>
          <section className={styles.content}>
            <div>
              <button onClick={handleCloseClick}>
                <FiXCircle size={25} />
              </button>
            </div>

            <article>
              <header>
                <h1>Detalhes do curso</h1>
              </header>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: course.excerpt }}
              />

              <section>
                <a href={course.link} target="_blank" rel="noreferrer">
                  Comprar
                </a>
              </section>
            </article>
          </section>
        </div>
      ) : null,
      document.getElementById("container")
    );
  } else {
    return null;
  }
}
