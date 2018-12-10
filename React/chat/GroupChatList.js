import React from "react";
import moment from "moment";
import { connect } from "react-redux";

const GroupChatList = chat => {
  const date = moment(chat.chatList.dateCreated).format("ddd LT");
  return (
    <React.Fragment>
      {chat.chatList.Id ? (
        <div id="users-list" className="list-group position-relative">
          <div className="users-list-padding">
            <a className="list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2">
              <span className="media">
                <span className="avatar avatar-md avatar-online mr-2">
                  <img
                    className="media-object d-flex mr-3 bg-primary rounded-circle"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHkAeQMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIFAwQHBgj/xAA8EAABAwIDBAUJBgcBAAAAAAABAAIDBBEFEkEGEyExByJRYXEUMnKBkaGxwdEVI0JSgrI0U2J1kqLwM//EABoBAQADAQEBAAAAAAAAAAAAAAABBAUDAgb/xAApEQEAAgEDAwQBBAMAAAAAAAAAAQIDBBESITFBBTJRYRMicYGxFTPB/9oADAMBAAIRAxEAPwCC1mGEAgEAgSBEoIoEVCUSoCJRKJQIlQIEoEgSCwXt5CAQCBIESgigRUBEqEokolEoESoECUCQRJsoCugsl0eQgECQIlBpVWIwU5LSS6Qfhb9VxyZq06O+PT3v18KifEamY8HmNugZw96q2z3svU0+Onjdr76W997Jf0iufKfl14V+GWOtqYz1ZXEdjuPxXqMt48vFsGO3eG/S4m2UhkwDHaEcj9FYx54npZUyaaaxvXq3yV3VUCUCQRJsoECUSV03FqujwECQIlBpYpUmnpSWGz3nKD2d645r8a9HfT4+d+vZ53XvWe1TcCxxa8FrhzBFiECQCAsgtaCszsEcp4jgHdqu4b716szUY+N+jdK7OCJKgQJRJEqAroLZdXgkCJQRKgVOP+bB2Xd8lV1Phd0fez3XR/s5BS4fFilXE19XUDPGXC+6ZpbvPO/esfPlmZ4x2beDHERylabTbKUWPjeuJgrALNnYL37nDUe9c8eW1P2e8mKLueYlsVjtC52Sl8qjHJ9Oc1/08/crlc9LKtsN4Vn2LixfkGF1xd2eTv8AovfOvy8cLfDcqNlMbpcOkr6iiLIYxme0uGcDU2Gi8xmpM7bvU4rxG+yoh1Ct4PKhqo7Ssaaq/BIfBytRKlMNklShElQIkqAkFuuzwRKCKgIoNLFaKoqqdkkUMj4o3hsj2tuGZuAudFU1VoiIjfqvaKszMz4djijbDEyJgs1jQ1o7gsDffq+hiNoSUJCAQJzGyNcx4u1ws4HUaoiXCDRVEEbpnwStp946JspacrnAngDqeC29PaJmYYeridoY1aUWzT1FrMefAqUNklEIkoFdBcErs8IqAigRUJew2HMcuH1kDw1x3gLmnVpFvkVj+pRMXrP02vS5icdq/b1KzWqEAgEAg8h0jGGm2bhp2Na3NUNEbQOVg4k/92q9oYmcsz9M71GYjFEfbmS12KEGeGa3VcfAqUM5KIK6C4XV4IoEVCUSUTDewXFZMJrN+xudjhlkZe2YfVcNRgjNTjLvp884L8odJp5mVEEc0ZuyRoc3wIuvnrVmszWfD6WlotWLR5ZF5eggEEXuaxjnvIDWi5J0CmI3naETO0buP7U7QSY/WskyGKniBEUZNzx5k954exbmnwRhrt5l89qdROe2/iFKrCsEAgyxSW6ruWiIZrjtUoXN11eCJUJRJRKJKBEqB7vYiv8AKcNfSv8APpnAD0Tcj4ELF9QxccnKPP8Abd9Ny8sfCfH9PRqg0QgEHmdv8UFBgT6djrT1n3TQPy/jPs4etXNFi55d/EKOvzcMXGO8uUrZYQQCAQCAQejJXVzRJRKJKBEqBAlB63o9vv682OUtYL24XBd9Vmepe2v8tX0v3X/j/r2iyWyEAg5z0pNd9oUDspy7lwzW4Xzclq+n+2zG9T99XiloM0kAgEAgEHoSV1c0SUSigiT7FCWnWVm6AbHZzjroFwyZor0hYw6eb9bdIdJ6J2Cs2XrBm+9bXuJJ1+7Ys/NSckfbUw2jHPSOj0z2OjcWvaQR2rOmJrO0tCtotG8IqEpRsdI7LG3MV6rWbTtCLWisby8n0vRtptnMOjJBldXZvVu33+IWhhpOOPtn5rRlnr2csYcw8Fepl5d2ZlwTT2murh2CAQCAQX5K6vCJNhcqJP2V81S97jkJa3S2qpXzTM9Gji09ax+qN5YXEu84k+K5TMz3WIiI7Nefzx4KEuj9CtdlqcTw9xHXYyZg8CWu+LUHRsdxCkwugdU1oLmAhrWttmcToE/F+T9Ozpira1tqvHN2yw7f3dR1Yh7AW3+Kj/Hfq79F/wDHfj36vZ4NXUeI0TanDzeJ1wRaxBHMEdqmcf4547KGSLRba7mXTTXbzE8OoGu4QxOleO9xsP2n2o5ue0/nFBmspiZjsiaxPcnNFuC60yzE7Sr5cFZjevdBWVEkAgvV0eGvWSZYso5uNlxz22rt8rOmpyvvPhoKk0Qg15vPQXuwGJDC9rcPmcbRyv3Eng/gPflPqQdY2v2drcbljfBVxtjhYckDmni7U39gXbFkineFjBmrj7w5geHMcRorzS3dX2U2dmwHfZ63fCUC8YjytBGt78VQy5Iv4ZmbNGTw41ttiP2rtViNS03jEu6j9FnVHwv61ycFTC0hxNjayDMgEGN4sVbxW3qzs9ON+nlFdHEILsldHho1js0tvyhUtRO99mjpa7U3+WBcVkIMMznB1gbCyDECQQ5pIcDcEaFB9F4HizcT2bpcUuLyU+d9tHgdYeogpBEby43bNHY6habadZxbHPItiZMXDgJPI2ujJ/mOADf9iFnWja0wx7xtaYfPw4Ady8vLNC5xNieHegzIBBF44Lthnrsraqu9YljVlRCC6XR4Vsjs0jj2lZ153tMtekcaxCK8vYQYphdt9QgwIOl9G+M22Sx3Dnu61LE+eIf0uabj/IX/AFL1SN7Q9443vEPPLRa7d2txvebIYNhTH9fO98oH5WOIYD43v6lRzRteWZqI2yS8QuTg2IW2Zc8ygyIBAncQV6pO1ol4yV5UmGJXWWEFyeS6S8eYVY5LMbRoBBF/mO8EGqg9NsL/AO+M/wBqm/cxe8fvh1w/7IZFoNVR4z/Gn0R81T1HvZ2q97RPIrgrNtvIeCBoBAiphE9mJXmSEH//2Q=="
                    alt="Generic placeholder "
                  />
                  <i />
                </span>
                <div className="media-body">
                  <h6 className="list-group-item-heading">
                    {chat.chatList.Name}
                    <span className="float-right info">{date}</span>
                  </h6>
                  <p className="list-group-item-text text-muted">{chat.chatList.Message}</p>
                </div>
              </span>
            </a>
          </div>
        </div>
      ) : (
        <div>{null}</div>
      )}
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(GroupChatList);
