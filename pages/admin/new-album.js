import Form from 'react-bootstrap/Form';

const NewAlbum = () => {
  return (
    <div>
      <div className="flex">
        <label htmlFor="albumTitle" className="text-center">Album title</label>
        <input id="albumTitle" type="text" placeholder="Type Album Title" />
      </div>
      <div>
        <label htmlFor="albumType">Album type</label>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="weddings">Weddings</option>
          <option value="engagements">Engagements</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default NewAlbum;