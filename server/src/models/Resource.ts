import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
    id: string;
    author: string;
    text: string;
    timestamp: Date;
    upvotes: number;
    isOp: boolean;
}

export interface IResource extends Document {
    title: string;
    courseCode: string;
    slot: string;
    type: 'Notes' | 'Question Bank' | 'Cheatsheet' | 'Lab Report' | 'Solution';
    topics: string[];
    qualityScore: number;
    completeness: number;
    upvotes: number;
    downloads: number;
    views: number;
    author: string;
    professor?: string;
    semester?: string;
    year?: string;
    description?: string;
    pdfUrl: string;
    comments: IComment[];
}

const CommentSchema = new Schema({
    id: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 },
    isOp: { type: Boolean, default: false }
});

const ResourceSchema = new Schema<IResource>(
    {
        title: { type: String, required: true, trim: true },
        courseCode: { type: String, required: true, uppercase: true, index: true },
        slot: { type: String, required: true, uppercase: true },
        type: {
            type: String,
            enum: ['Notes', 'Question Bank', 'Cheatsheet', 'Lab Report', 'Solution'],
            required: true
        },
        topics: [{ type: String }],
        qualityScore: { type: Number, default: 0 },
        completeness: { type: Number, min: 0, max: 100, default: 50 },
        upvotes: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        author: { type: String, required: true, default: 'Anonymous' },
        professor: { type: String },
        semester: { type: String },
        year: { type: String },
        description: { type: String },
        pdfUrl: { type: String, required: true },
        comments: [CommentSchema]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Index for search
ResourceSchema.index({
    title: 'text',
    courseCode: 'text',
    topics: 'text',
    professor: 'text'
});

export default mongoose.model<IResource>('Resource', ResourceSchema);
