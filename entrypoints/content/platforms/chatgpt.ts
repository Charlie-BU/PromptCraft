// 等待输入框加载
export const waitForInputBox = () => {
  const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
  console.log("textarea", textarea);
  const parent = textarea?.parentElement;
  if (textarea) {
    injectButton(textarea);
  } else {
    setTimeout(waitForInputBox, 1000);
  }
};

const injectButton = (textarea: HTMLTextAreaElement) => {
  // 避免重复插入
  if (document.getElementById("prompt-optimizer-btn")) return;

  const button = document.createElement("button");
  button.id = "prompt-optimizer-btn";
  button.innerText = "优化提示词";
  button.style.marginLeft = "8px";
  button.style.padding = "4px 8px";
  button.style.border = "1px solid #ccc";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.disabled = false;

  // 插入到输入框父节点
  textarea.parentElement?.appendChild(button);

  // 点击事件
  button.addEventListener("click", () => {
    const userInput = textarea.value;
    console.log("用户输入内容:", userInput);
  });
};
