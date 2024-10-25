const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Coelho34757741",
    database: "controle",
  });

  app.use(cors({
    origin: 'http://localhost:3000', // Permite apenas requisições deste frontend
  }));
app.use(express.json());



app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get/materia", (req, res) => {
    const sqlSelect = "SELECT * FROM Materia";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send(err);
      } else {
        console.log("Dados enviados:", result);
        res.send(result);
      }
    });
});

app.get("/api/get/banca", (req, res) => {
  const sqlSelect = "SELECT * FROM Banca";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});
app.get("/api/get/prova", (req, res) => {
  const sqlSelect = "SELECT * FROM Prova";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});

app.get("/api/get/tipo", (req, res) => {
  const sqlSelect = "SELECT * FROM TipoQuestao";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});

app.post("/api/inserir", (req, res) => {
  const acerto = req.body.acerto;
  const erro = req.body.acerto;
  const Materia_idMateria = req.body.Materia_idMateria;
  const TipoQuestao_idTipoQuestao = req.body.TipoQuestao_idTipoQuestao;
  const Banca_idBanca = req.body.Banca_idBanca;
  
  const sqlInsert =
    "INSERT INTO questao (acerto, erro, Materia_idMateria, TipoQuestao_idTipoQuestao, Banca_idBanca) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [acerto, erro, Materia_idMateria, TipoQuestao_idTipoQuestao, Banca_idBanca], (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});
app.post("/api/inserirprova", (req, res) => {
  const prova = req.body.prova;
  const data = req.body.data
  const Banca_idBanca = req.body.Banca_idBanca;
  
  const sqlInsert =
    "INSERT INTO prova (prova, data, Banca_idBanca) VALUES (?,?,?)";
  db.query(sqlInsert, [prova, data, Banca_idBanca], (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);}
    })
  });
  app.post("/api/inserirmateria", (req, res) => {
    const materia = req.body.materia;
    
    
    const sqlInsert =
      "INSERT INTO materia (materia) VALUES (?)";
    db.query(sqlInsert, [materia], (err, result) => {
      if (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send(err);
      } else {
        console.log("Dados enviados:", result);
        res.send(result);
      }
    });
});
app.post("/api/inserirbanca", (req, res) => {
  const banca = req.body.banca;
  
  
  
  const sqlInsert =
    "INSERT INTO banca (banca) VALUES (?)";
  db.query(sqlInsert, [banca], (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});

app.delete("/api/deletabanca/:idBanca", (req, res) => {
  const idBanca = req.body.idBanca;
  
  
  
  const sqlDelete=
    "DELETE FROM banca WHERE idBanca = ?";
  db.query(sqlDelete, [idBanca], (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});

app.delete("/api/deletamateria/:idMateria", (req, res) => {
  const idMateria = req.params.idMateria;
  
  
  
  const sqlDelete=
    "DELETE FROM materia WHERE idMateria = ?";
  db.query(sqlDelete, [idMateria], (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});


  app.listen(3008, () => {
    console.log("rodando na port 3008");
  });

  
app.get("/api/relatorio-acertos", (req, res) => {
    const acertosPorBanca = [
        { nomeBanca: 'Cespe', acertos: 50 },
        { nomeBanca: 'FCC', acertos: 30 },
    ];

    const acertosPorMateria = [
        { nomeMateria: 'Matemática', acertos: 40 },
        { nomeMateria: 'Português', acertos: 60 },
    ];

    const acertosPorTipo = [
        { nomeTipo: 'Objetiva', acertos: 80 },
        { nomeTipo: 'Dissertativa', acertos: 20 },
    ];

    const totalAcertos = 100;

    res.send({
        acertosPorBanca,
        acertosPorMateria,
        acertosPorTipo,
        totalAcertos,
    });
});

app.get("/api/get/total", (req, res) => {
  const sqlSelect = "SELECT  COUNT(CASE WHEN acerto = 0 THEN 1 END) AS total_erros, COUNT(CASE WHEN acerto = 0 THEN 1 END) AS total_erros, COUNT(CASE WHEN acerto = 1 THEN 1 END) AS total_acertos, COUNT(*) AS total FROM  questao;" ;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});

app.get("/api/get/totalbanca", (req, res) => {
  const sqlSelect = "SELECT B.banca, COUNT(Q.idQuestao) AS total, SUM(CASE WHEN Q.acerto = 1 THEN 1 ELSE 0 END) AS total_acertos, SUM(CASE WHEN Q.acerto = 0 THEN 1 ELSE 0 END) AS total_erros FROM Questao Q JOIN Banca B ON Q.Banca_idBanca = B.idBanca GROUP BY B.idBanca;" ;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});
app.get("/api/get/totalmateria", (req, res) => {
  const sqlSelect = "SELECT M.materia, COUNT(Q.idQuestao) AS total_questoes, SUM(CASE WHEN Q.acerto = 1 THEN 1 ELSE 0 END) AS total_acertos, SUM(CASE WHEN Q.acerto = 0 THEN 1 ELSE 0 END) AS total_erros FROM Questao Q JOIN Materia M ON Q.Materia_idMateria = M.idMateria GROUP BY M.idMateria;" ;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      res.status(500).send(err);
    } else {
      console.log("Dados enviados:", result);
      res.send(result);
    }
  });
});