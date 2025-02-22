import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { useStateContext } from "@/contexts/ContextProvider";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const History = () => {
  const {history, setLoad} = useStateContext();

  const fetchChat = (e:any, chat:any) => {
    e.preventDefault();
    setLoad({query: chat.query, data: chat.answer})
  }
  return (
    <div className="">
      <h1 className="font-bold text-xl mb-2">History</h1>
    <div className="relative flex h-full w-full xl:w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg ">
      <Tree
        className=" overflow-hidden rounded-md  "
        initialSelectedId="1"
        openIcon={<IoIosArrowUp/>}
        closeIcon={<IoIosArrowDown/>}
        elements={history}
      >
          {history.map((item:any) => (
            <Folder value={item._id} element={item.date} >
              {item.chats.map((chat:any, index:any) =>(
                <File fileIcon={<FiSearch/>} value={chat._id}>
                  <Link href="#" onClick={(e) => {
                    fetchChat(e, chat);
                  }}>
                    <p>{chat.title}</p>
                  </Link>
                </File>
              ))}
            </Folder>
          ))} 
      </Tree>
    </div>
    </div>
  );
}


export default History;
