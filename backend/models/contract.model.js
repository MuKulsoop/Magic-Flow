import mongoose from 'mongoose';

const parameterSchema = new mongoose.Schema({
  name: String,
  type: String,
  value: String,
});

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number,
  },
  data: {
    label: String,
    code: String,
    parameters: [parameterSchema],
    returnType: String,
  },
});

const edgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  label: String,
  type: String,
});

const contractSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    flowchartData: {
      nodes: [nodeSchema],
      edges: [edgeSchema],
    },
    deploymentStatus: {
      type: String,
      enum: ['draft', 'deployed', 'failed'],
      default: 'draft',
    },
    deploymentHash: String,
  },
  { timestamps: true }
);

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;
