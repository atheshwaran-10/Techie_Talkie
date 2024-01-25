"use client";
import Chat from "@/components/chat";
import Status from "@/components/status";
import { useContext, useEffect, useState } from "react";

import { Modal } from "@/common/components/index";

import React from "react";

const test = () => {
  const [modal, setModal] = useState<"hidden" | "chat" | "status" | "close">(
    "hidden",
  );
  
  return (
    <div>
      <Modal
        title={
          modal === "chat" ? "Meeting Chat" : modal === "status" ? "People" : ""
        }
        modal={modal}
        onClose={() => setModal("close")}
      >
        <div className={modal !== "chat" ? "hidden" : ""}>
          <Chat />
        </div>
        <div className={modal !== "status" ? "hidden" : ""}>
          <Status muted={true} visible={true} />
        </div>
      </Modal>
    </div>
  );
};

export default test;
