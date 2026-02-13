import mongoose, { Document, Schema } from 'mongoose';

export interface ICourseStats extends Document {
    courseCode: string;
    completeness: number;
    qualityAvg: number;
    totalResources: number;
    topicCoverage: { topic: string; coverage: number }[];
    activityGrid: number[];
}

const CourseStatsSchema = new Schema<ICourseStats>(
    {
        courseCode: { type: String, required: true, unique: true },
        completeness: { type: Number, default: 0 },
        qualityAvg: { type: Number, default: 0 },
        totalResources: { type: Number, default: 0 },
        topicCoverage: [{
            topic: String,
            coverage: Number
        }],
        activityGrid: [{ type: Number }]
    },
    { timestamps: true }
);

export default mongoose.model<ICourseStats>('CourseStats', CourseStatsSchema);
