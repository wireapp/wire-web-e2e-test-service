/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import {ReactionType} from '@wireapp/core/dist/conversation/';
import {ImageContent, LinkPreviewContent, MentionContent, QuoteContent} from '@wireapp/core/dist/conversation/content/';
import * as express from 'express';
import * as Joi from 'joi';

import InstanceService from '../../InstanceService';
import joiValidate from '../../middlewares/joiValidate';
import {hexToUint8Array} from '../../utils';

export interface MessageRequest {
  conversationId: string;
}

export interface ArchiveRequest extends MessageRequest {
  archive: boolean;
}

export interface MuteRequest extends MessageRequest {
  mute: boolean;
}

export interface DeletionRequest extends MessageRequest {
  messageId: string;
}

export interface LinkPreviewRequest {
  image?: {
    data: string;
    height: number;
    type: string;
    width: number;
  };
  permanentUrl: string;
  summary?: string;
  title?: string;
  tweet?: {
    author?: string;
    username?: string;
  };
  url: string;
  urlOffset: number;
}

export interface TextRequest extends MessageRequest {
  linkPreview?: LinkPreviewRequest;
  mentions?: MentionContent[];
  messageTimer?: number;
  quote?: QuoteStringContent;
  text: string;
}

export interface ReactionRequest extends MessageRequest {
  originalMessageId: string;
  type: ReactionType;
}

export interface LocationRequest extends MessageRequest {
  latitude: number;
  locationName?: string;
  longitude: number;
  messageTimer?: number;
  zoom?: number;
}

export interface MessageUpdateRequest extends MessageRequest {
  firstMessageId: string;
  mentions?: MentionContent[];
  text: string;
  linkPreview?: LinkPreviewRequest;
}

export interface MessageUpdateRequest extends TextRequest {
  firstMessageId: string;
}

export interface QuoteStringContent {
  quotedMessageId: string;
  quotedMessageSha256: string;
}

const validateLinkPreview = {
  image: Joi.object({
    data: Joi.string().required(),
    height: Joi.number().required(),
    type: Joi.string().required(),
    width: Joi.number().required(),
  }).optional(),
  permanentUrl: Joi.string().required(),
  summary: Joi.string().optional(),
  title: Joi.string().optional(),
  tweet: Joi.object({
    author: Joi.string().optional(),
    username: Joi.string().optional(),
  }).optional(),
  url: Joi.string().required(),
  urlOffset: Joi.number().required(),
};

export const validateMention = Joi.object({
  length: Joi.number().required(),
  start: Joi.number().required(),
  userId: Joi.string()
    .uuid()
    .required(),
});

const validateQuote = {
  quotedMessageId: Joi.string()
    .uuid()
    .required(),
  quotedMessageSha256: Joi.string()
    .regex(/[A-f0-9]{64}\b/)
    .required(),
};

const conversationRoutes = (instanceService: InstanceService): express.Router => {
  const router = express.Router();

  router.post(
    '/api/v1/instance/:instanceId/archive/?',
    joiValidate({
      archive: Joi.boolean().required(),
      conversationId: Joi.string()
        .uuid()
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {archive, conversationId}: ArchiveRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const instanceName = await instanceService.toggleArchiveConversation(instanceId, conversationId, archive);
        return res.json({
          instanceId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/mute/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      mute: Joi.boolean().required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {mute, conversationId}: MuteRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const instanceName = await instanceService.toggleMuteConversation(instanceId, conversationId, mute);
        return res.json({
          instanceId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/clear/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId}: MessageRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const instanceName = await instanceService.clearConversation(instanceId, conversationId);
        return res.json({
          instanceId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/delete/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      messageId: Joi.string()
        .uuid()
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, messageId}: DeletionRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const instanceName = await instanceService.deleteMessageLocal(instanceId, conversationId, messageId);
        return res.json({
          instanceId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/deleteEverywhere/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      messageId: Joi.string()
        .uuid()
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, messageId}: DeletionRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const instanceName = await instanceService.deleteMessageEveryone(instanceId, conversationId, messageId);
        return res.json({
          instanceId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/getMessages/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId}: MessageRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const messages = instanceService.getMessages(instanceId, conversationId);
        return res.json(messages || {});
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/sendLocation/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      latitude: Joi.number().required(),
      locationName: Joi.string().optional(),
      longitude: Joi.number().required(),
      messageTimer: Joi.number()
        .optional()
        .default(0),
      zoom: Joi.number().optional(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, latitude, longitude, locationName, messageTimer, zoom}: LocationRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const messageId = await instanceService.sendLocation(
          instanceId,
          conversationId,
          {
            latitude,
            longitude,
            name: locationName,
            zoom,
          },
          messageTimer
        );
        const instanceName = instanceService.getInstance(instanceId).name;
        return res.json({
          instanceId,
          messageId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/sendText/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      linkPreview: Joi.object(validateLinkPreview).optional(),
      mentions: Joi.array()
        .items(validateMention)
        .optional(),
      messageTimer: Joi.number()
        .optional()
        .default(0),
      quote: Joi.object(validateQuote).optional(),
      text: Joi.string().required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, linkPreview, mentions, messageTimer, quote, text}: TextRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      let linkPreviewContent: LinkPreviewContent | undefined;
      let quoteContent: QuoteContent | undefined;

      if (linkPreview) {
        linkPreviewContent = {
          ...linkPreview,
          image: undefined,
        };

        if (linkPreview.image) {
          const data = Buffer.from(linkPreview.image.data, 'base64');
          const imageContent: ImageContent = {
            data,
            height: linkPreview.image.height,
            type: linkPreview.image.type,
            width: linkPreview.image.width,
          };

          linkPreviewContent.image = imageContent;
        }
      }

      if (quote) {
        quoteContent = {
          quotedMessageId: quote.quotedMessageId,
          quotedMessageSha256: hexToUint8Array(quote.quotedMessageSha256),
        };
      }

      try {
        const messageId = await instanceService.sendText(
          instanceId,
          conversationId,
          text,
          linkPreviewContent,
          mentions,
          quoteContent,
          messageTimer
        );
        const instanceName = instanceService.getInstance(instanceId).name;
        return res.json({
          instanceId,
          messageId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/sendPing/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      messageTimer: Joi.number()
        .optional()
        .default(0),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, messageTimer}: TextRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const messageId = await instanceService.sendPing(instanceId, conversationId, messageTimer);
        const instanceName = instanceService.getInstance(instanceId).name;
        return res.json({
          instanceId,
          messageId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/sendReaction/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      originalMessageId: Joi.string()
        .uuid()
        .required(),
      type: Joi.string()
        .valid(ReactionType.LIKE, ReactionType.NONE)
        .required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, originalMessageId, type}: ReactionRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      try {
        const messageId = await instanceService.sendReaction(instanceId, conversationId, originalMessageId, type);
        const instanceName = instanceService.getInstance(instanceId).name;
        return res.json({
          instanceId,
          messageId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  router.post(
    '/api/v1/instance/:instanceId/updateText/?',
    joiValidate({
      conversationId: Joi.string()
        .uuid()
        .required(),
      firstMessageId: Joi.string()
        .uuid()
        .required(),
      linkPreview: Joi.object(validateLinkPreview).optional(),
      mentions: Joi.array()
        .items(validateMention)
        .optional(),
      quote: Joi.object(validateQuote).optional(),
      text: Joi.string().required(),
    }),
    async (req: express.Request, res: express.Response) => {
      const {instanceId = ''}: {instanceId: string} = req.params;
      const {conversationId, firstMessageId, linkPreview, mentions, quote, text}: MessageUpdateRequest = req.body;

      if (!instanceService.instanceExists(instanceId)) {
        return res.status(400).json({error: `Instance "${instanceId}" not found.`});
      }

      let linkPreviewContent: LinkPreviewContent | undefined;
      let quoteContent: QuoteContent | undefined;

      if (linkPreview) {
        linkPreviewContent = {
          ...linkPreview,
          image: undefined,
        };

        if (linkPreview.image) {
          const data = Buffer.from(linkPreview.image.data, 'base64');
          const imageContent: ImageContent = {
            data,
            height: linkPreview.image.height,
            type: linkPreview.image.type,
            width: linkPreview.image.width,
          };

          linkPreviewContent.image = imageContent;
        }
      }

      if (quote) {
        quoteContent = {
          quotedMessageId: quote.quotedMessageId,
          quotedMessageSha256: hexToUint8Array(quote.quotedMessageSha256),
        };
      }

      try {
        const messageId = await instanceService.sendEditedText(
          instanceId,
          conversationId,
          firstMessageId,
          text,
          linkPreviewContent,
          mentions,
          quoteContent
        );

        const instanceName = instanceService.getInstance(instanceId).name;

        return res.json({
          instanceId,
          messageId,
          name: instanceName,
        });
      } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack});
      }
    }
  );

  return router;
};

export default conversationRoutes;
