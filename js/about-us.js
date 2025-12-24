const tabs = document.querySelectorAll(".mission-tab-inside");

const content = {
  mission: {
    title: "Mission",
    subtitle1: "To transform data into intelligent decisions.",
    subtitle2:
      "Inseyab is committed to delivering AI-powered, scalable, and intuitive Business Intelligence solutions that empower enterprises and governments to make smarter, faster, and more confident decisions. We prioritize innovation, security, compliance, and exceptional customer experience, while continuously advancing our AI and BI capabilities to help our clients stay ahead in a rapidly evolving world of data and intelligence.",
    image: "../assets/img-mission.png"
  },
  vision: {
    title: "Vision",
    subtitle1: "Empowering an AI-driven, data-intelligent world.",
    subtitle2:
      "Inseyab envisions a future where organizations seamlessly unlock the full value of their data through intelligent, AI-enabled Business Intelligence. We strive to remove complexity and democratize insights, enabling decision-makers at every level to analyze, predict, and innovate with clarity and speed. By combining user-centric design, advanced artificial intelligence, and enterprise-grade security, we aim to lead the evolution of BI—from static reporting to adaptive, predictive, and self-service intelligence—ensuring our clients thrive in an ever-changing digital and data landscape.",
    image: "../assets/img-mission.png"
  }
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.tab;

    document.getElementById("tabTitle").innerText = content[type].title;
    document.getElementById("tabSubtitle1").innerText = content[type].subtitle1;
    document.getElementById("tabSubtitle2").innerText = content[type].subtitle2;
    document.getElementById("tabImage").src = content[type].image;
  });
});
