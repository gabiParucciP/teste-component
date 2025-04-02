import React from "react";
type actions = "UPLOAD_START" | "UPLOAD_END" | "REMOVE_FILE";

type ActionType = {
  type: actions;
  payload: any;
};

type StateType = {
  files?: {
    name?: string;
    size?: number;
    image?: any;
    loading?: boolean;
    type?: string;
  }[];
};

export const initialState = {
  files: [],
};

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "UPLOAD_START":
      return {
        files: [
          ...(state?.files as any),
          {
            name: action.payload.file.name,
            size: action.payload.file.size,
            image: action.payload.file,
            type: action.payload.file.type,
            loading: true,
          },
        ],
      };
    case "UPLOAD_END":
      return {
        files: state?.files?.map((file) => {
          if (file.name === action.payload.name) {
            return {
              ...file,
              image: action.payload.result,
              loading: false,
            };
          }

          return file;
        }),
      };
    case "REMOVE_FILE":
      return {
        files: state?.files?.filter(
          (file) => file.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
}
