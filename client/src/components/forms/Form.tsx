import './form.css';

export default function Form() {
  return (
    <div>
      <form>
        <div className="input-group">
          <input type="text" id="surname" required placeholder=" " />
          <label htmlFor="surname">Nom</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" required placeholder=" " />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
            <input type="password" id="password" required placeholder=" " />
            <label htmlFor="password">Mot de passe</label>
        </div>
      </form>
    </div>
  );
}