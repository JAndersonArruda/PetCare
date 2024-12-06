![UCD](./artifacts/petCare-UCD.jpeg)
![CD](./artifacts/petCare-CD.png)
![ERD](./artifacts/petcare-ER.png)
![LM](./artifacts/petcare-logico-FN.png)

**Usuário** (<u>email</u>, nome, telefone, uf, cidade, rua, bairro, num, tipo) \
**Especializações** (<u>emailProfissional</u>, <u>especialização</u>) \
**Certificados** (<u>emailProfissional</u>, <u>certificado</u>) \
**Clinica** (<u>id</u>, nome, telefone, latitude, longitude) \
**ProfissionalTrabalhaClinica** (<u>idClinica</u>, <u>emailProfissional</u>) \
**HorariosAtendimento** (<u>id</u>, dia, horaInicio, horaFim, idClinica) \
**Serviço** (<u>id</u>, tipo, data, idClinica) \
**ObservaçoesServiço** (<u>id</u>, observações, idServiço) \
**Vacina** (<u>id_Serviço</u>, nome, validade, fabricante, lote) \
**Pet** (<u>id</u>, nome, idade, porte, raça,características, foto, historicoMedico, emailTutor) \
**ProfissionalAtendePetServiço** (<u>emailProfissional</u>, <u>idPet</u>, <u>idServiço</u>, preco, dataAtendimento, horaAtendimento) \
**TutorAgendaServiçoPet** (<u>emailTutor</u>, <u>idServiço</u>, <u>idPet</u>, <u>idHorariosAtendimento</u>, status, data, horarioInicio, horarioFim) \
**Avaliação** (<u>id</u>, nota, comentario) \
**UsuarioAvaliaServiço** (<u>emailTutor</u>, <u>idServiço</u>, <u>idAvaliação</u>)