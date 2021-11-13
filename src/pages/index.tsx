import type { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { useCallback, useState } from "react";
import { RichText } from "prismic-dom";
import { ImLinkedin, ImInstagram } from "react-icons/im";
import { Modal } from "./components/modal";
import { getPrismicClient } from "../services/prismic";

import styles from "../../styles/Home.module.scss";

export default function Home(content: any) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(content);
  const [course, setCourse] = useState({});

  const handOpenCourse = (e: any) => {
    setCourse(data.content.find((cont: any) => cont.course === e.target.id));

    setShowModal(true);
  };

  return (
    <div
      className={styles.container}
      style={showModal ? { overflowY: "hidden" } : {}}
      id="container"
    >
      <header className={styles.header}>
        <div>
          <h1>Certificações PQO</h1>
        </div>
        <nav>
          <a
            href="https://www.instagram.com/obadias_alves.cfp/"
            target="_blank"
            rel="noreferrer"
          >
            <ImInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/obadias-alves-cea-cfp%C2%AE-1022bb98/"
            target="_blank"
            rel="noreferrer"
          >
            <ImLinkedin />
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <header>
          <h2>
            Adquira o melhor curso e aumente suas chances de ser aprovado nas
            seguites certificações
          </h2>
        </header>
        <div>
          <section>
            <header>
              <h2>Operações</h2>
            </header>
            <p>
              Essa modalidade de certificação PQO é indicada para aqueles
              profissionais que fazem a intermediação de operações na B3. Ou
              seja, é quem garante que será debitado ou creditado às compras e
              vendas de ações da conta do investidor.
            </p>
            <article>
              <button id="pqo_operacoes" onClick={handOpenCourse}>
                Ver mais
              </button>
            </article>
          </section>
          <section>
            <header>
              <h2>Compliance</h2>
            </header>
            <p>
              A certificação PQO Compliance é indicada para os profissionais que
              supervisionam os procedimentos e controles internos de corretoras.
              Ele é fundamental no combate a lavagem de dinheiro, fraudes,
              clientes fantasmas, constituição de garantias inexistentes ou
              mesmo falsas, dentre outros.
            </p>
            <article>
              <button id="pqo_compliance">Indisponível</button>
            </article>
          </section>
          <section>
            <header>
              <h2>Back Office</h2>
            </header>
            <p>
              A certificação na modalidade Back Office é aplicada para aqueles
              profissionais que são responsáveis por fazer a liquidação,
              registro, controlar as garantias, custódias e cadastro dos
              clientes. Como é a modalidade mais completa, essa certificação é
              também a mais difícil de ser tirada.
            </p>
            <article>
              <button id="pqo_backoffice" onClick={handOpenCourse}>
                Ver mais
              </button>
            </article>
          </section>
        </div>
        <Modal
          data={data}
          show={showModal}
          course={course}
          onClose={() => setShowModal(false)}
        />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at("document.type", "certificacao"),
  ]);

  const content = response.results.map((content) => {
    return {
      id: content.id,
      course: content.slugs[0],
      excerpt: RichText.asHtml(content.data.content),
      link: content.data.link.url,
    };
  });

  return {
    props: { content },
    revalidate: 60 * 60 * 24 * 30, // 24 horas
  };
};
