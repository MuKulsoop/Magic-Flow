import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { FlowchartEditor } from "../components/flowchart/FlowchartEditor";
import { ContractPreview } from "../components/contract/ContractPreview";
import { ContractTemplateCard } from "../components/contract/ContractTemplateCard";
import { useAuth } from "../context/AuthContext";
import { FlowchartData, ContractTemplate } from "../types";
import { mockTemplates } from "./utils/mockData";
import { Plus } from "lucide-react";

export const BuilderPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<"select-template" | "builder">(
    "select-template"
  );
  const [flowchartData, setFlowchartData] = useState<FlowchartData>({
    nodes: [],
    edges: [],
  });
  const [contractName, setContractName] = useState("");
  const [contractDescription, setContractDescription] = useState("");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleTemplateSelect = (template: ContractTemplate) => {
    setFlowchartData(template.flowchartData);
    setContractName(template.name);
    setContractDescription(template.description);
    setActiveStep("builder");
  };

  const handleStartEmpty = () => {
    setFlowchartData({ nodes: [], edges: [] });
    setContractName("New Contract");
    setContractDescription("");
    setActiveStep("builder");
  };

  const handleSaveFlowchart = (data: FlowchartData) => {
    setFlowchartData(data);
    // In a real app, this would save to a backend
    alert("Contract saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {activeStep === "select-template" ? (
        <>
          <PageHeader
            title="Create a New Contract"
            description="Start with a template or create from scratch."
            action={
              <Button
                variant="outline"
                leftIcon={<Plus size={16} />}
                onClick={handleStartEmpty}
              >
                Start from Scratch
              </Button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTemplates.map((template) => (
              <ContractTemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <PageHeader
            title={contractName}
            description={contractDescription}
            action={
              <Button
                variant="outline"
                onClick={() => setActiveStep("select-template")}
              >
                Back to Templates
              </Button>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[600px]">
              <FlowchartEditor
                initialData={flowchartData}
                onSave={handleSaveFlowchart}
              />
            </div>

            <div>
              <ContractPreview
                flowchartData={flowchartData}
                contractName={contractName}
                contractDescription={contractDescription}
              />

              <div className="mt-6">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => navigate("/deploy")}
                >
                  Continue to Deployment
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
