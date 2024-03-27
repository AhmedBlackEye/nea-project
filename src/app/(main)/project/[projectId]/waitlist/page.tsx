// import EditorProvider from "@/components/providers/waitlist-widget";
// import WidgetDesignSettings from "../../../../../components/waitlist/settings";
import { getCampaignData } from "@/lib/queries/campaign";
import { notFound } from "next/navigation";

async function ProjectWaitlisttPage() {
  const campaignId = "";
  const campaignData = await getCampaignData(campaignId);
  if (!campaignData) return notFound();

  return (
    <main>
      {/* <EditorProvider initialState={campaignData.content!}>
        <div className="flex">
          <WidgetDesignSettings />
        </div>
      </EditorProvider> */}
    </main>
  );
}

export default ProjectWaitlisttPage;
