import { model, Schema } from "mongoose";
import { handleSaveError } from "./hooks.js";

const sessionShcema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      /*
      type: String,
      require: true,
      */
    },
    accessToken: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
      require: true,
    },
    accessTokenValidUntil: {
      type: Date,
      require: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionShcema.post('save', handleSaveError);
sessionShcema.post('findOneAndUpdate', handleSaveError);

const SessionCollection = model("session", sessionShcema)

export default SessionCollection;
