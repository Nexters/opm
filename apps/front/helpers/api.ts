import { Url } from "opm-models";

const Header = {
  json: {
    "Content-Type": "application/json",
  },
};

export const Api = {
  get: async (path: string, headers = Header.json) => {
    return fetch(
      `${
        process.env.NODE_ENV === "production"
          ? Url.REAL_SERVER
          : Url.LOCAL_SERVER
      }${path}`,
      {
        method: "GET",
        headers,
      },
    );
  },
  post: async (path: string, body: any, headers = Header.json) => {
    return fetch(
      `${
        process.env.NODE_ENV === "production"
          ? Url.REAL_SERVER
          : Url.LOCAL_SERVER
      }${path}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
    );
  },
  filePost: async (path: string, body: any) => {
    return fetch(
      `${
        process.env.NODE_ENV === "production"
          ? Url.REAL_SERVER
          : Url.LOCAL_SERVER
      }${path}`,
      {
        method: "POST",
        body,
      },
    );
  },
  mailSend: async (body: any, headers: any) => {
    return fetch("https://mail.apigw.ntruss.com/api/v1/mails", {
      method: "POST",
      headers,
      body,
    });
  },
};
