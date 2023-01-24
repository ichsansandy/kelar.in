import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Selector from "./Selector";

function MemberCard() {
  const dispatch = useDispatch();
  const listUser = useSelector((s) => s.listUser);
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [listEditable, setListEditable] = useState([]);
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(loggedInUser);
    fetchListUser();
    setListEditable(listUser.sort());
    setListEditable((currState) => {
      return currState.filter((u) => {
        if (u !== loggedInUser.name) {
          return u;
        }
      });
    });
  }, []);

  const removeFromMember = (member) => {
    setMembers((currMember) => {
      return currMember.filter((m) => {
        if (m !== member) {
          return m;
        }
      });
    });
    setListEditable([...listEditable, member]);
  };

  const addToMember = (input) => {
    if (input !== "") {
      setMembers([...members, input]);
      toast.success("succesfully added to member");
      //remove from list editable to prevent duplicate
      setListEditable((state) => {
        return state.filter((s) => {
          if (s !== input) {
            return s;
          }
        });
      });
      setSelected("");
    } else {
      toast.error("Please Choose User");
    }
  };

  function fetchListUser() {
    console.log("fetching all user list only name data");
    fetch(`http://localhost:8081/api/all-user-nameonly`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        dispatch({ type: "SET_USER_LIST", payload: d });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="relative w-full mb-3 pt-3">
      <div className={isOpen ? " flex" : " hidden"}>
        <div className="w-4/6 ">
          <Selector selected={selected} setSelected={setSelected} lists={listEditable} />
        </div>
        <button
          className="bg-third-color text-white px-2 ml-auto rounded hover:bg-primary-color hover:ring-third-color"
          type="button"
          onClick={() => {
            addToMember(selected);
          }}>
          ADD
        </button>
        <button
          className="bg-third-color text-white px-2 ml-auto rounded hover:bg-primary-color hover:ring-third-color"
          type="button"
          onClick={() => {
            setIsOpen(false);
          }}>
          SAVE
        </button>
      </div>
      <div className={"absolute p-2 inset-x-0  w-full top rounded bg-secondary-color text-fourth-color font-extrabold z-30 " + (isOpen ? "hidden" : "")}>Members</div>
      <button className={"absolute right-0 top-3 bg-fourth-color z-40 p-2 rounded "+(isOpen ? " hidden" : " ")} onClick={()=>setIsOpen(true)}><svg class="h-6 w-6 text-white"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg></button>
      <ul className="list-disc mt-5 w-full h-52 overflow-x-auto py-2 px-10 bg-white rounded">
        {members.map((member) => (
          <div className="group" onClick={() => removeFromMember(member)}>
            <li className=" p-0 text-left ">
              {member}
              <span className="text-third-color invisible group-hover:visible"> click to remove</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MemberCard;
