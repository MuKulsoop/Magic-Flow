import Contract from "../models/contract.model.js";

// @desc Create new contract
export const createContract = async (req, res) => {
  try {
    const { name, description, flowchartData } = req.body;
    const ownerId = req.user.id; // From auth middleware

    const newContract = new Contract({
      name,
      description,
      ownerId,
      flowchartData,
    });

    await newContract.save();
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contract' });
  }
};

// @desc Get all contracts of logged-in user
export const getUserContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ ownerId: req.user.id });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts' });
  }
};

// @desc Get single contract
export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract || contract.ownerId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contract' });
  }
};

// @desc Update contract
export const updateContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract || contract.ownerId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    const { name, description, flowchartData, deploymentStatus, deploymentHash } = req.body;

    contract.name = name ?? contract.name;
    contract.description = description ?? contract.description;
    contract.flowchartData = flowchartData ?? contract.flowchartData;
    contract.deploymentStatus = deploymentStatus ?? contract.deploymentStatus;
    contract.deploymentHash = deploymentHash ?? contract.deploymentHash;

    await contract.save();
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contract' });
  }
};

// @desc Delete contract
export const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract || contract.ownerId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    await contract.remove();
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contract' });
  }
};
