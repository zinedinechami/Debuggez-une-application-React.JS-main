import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// fonction qui stimule un reponse contact API, appelant une promese, toutes  les 1 sec
// une fonction call back est une fonction passé en argument dans une autre fonction, donc une fonction qu'on peut faire passer en tant que valeur
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

function Form({ onSuccess, onError }) {
  const [sending, setSending] = useState(false);
  // le useCallback permet de ne pas re render le code present à certaines conditions
  // re render le component que lorsque la dépendence change
  // functions activates after the sending of the form
  // changes the state of sending, thus sending a message to the user
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi?
      try {
        await mockContactApi();
        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  // console.log(sending);

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          {/* look into the componenets individually */}
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {/* Changed sedding message */}
            {sending ? "Message envoyé" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
