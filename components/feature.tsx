import FeatureCard from "./featureCard";

export default function Feature() {
  return (
    <div className="flex justify-center my-10">
      <div className="flex p-6 justify-center">
        <FeatureCard
          title="Powerful security within minutes"
          description="For those who want to do more, secure more, and collaborate more, Bitwarden is fast and easy to set up for both individuals and businesses."
          topText="EASY"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
              <path
                fill="#30469c"
                fillRule="evenodd"
                d="M28 51.906C14.797 51.906 4.094 41.203 4.094 28S14.797 4.094 28 4.094S51.906 14.797 51.906 28S41.203 51.906 28 51.906M28 7.92c11.09 0 20.081 8.99 20.081 20.081c0 11.09-8.99 20.081-20.081 20.081c-11.09 0-20.081-8.99-20.081-20.081a20.023 20.023 0 0 1 6.185-14.497c.144-.138.33-.307.558-.507l.092-.071a.928.928 0 0 1 1.242.185l.019.023a.956.956 0 0 1-.112 1.318a15.42 15.42 0 0 0-.53.485A18.114 18.114 0 0 0 9.83 28c0 10.034 8.135 18.169 18.169 18.169S46.169 38.034 46.169 28S38.034 9.831 28 9.831v8.606a.956.956 0 1 1-1.913 0V8.875a.956.956 0 0 1 1.127-.941c.26-.01.523-.015.786-.015M17.031 18.438c-.82-1.172.399-2.391 1.57-1.57L31 25.515c2.227 1.547 2.601 4.172.75 6.093c-1.899 1.852-4.523 1.453-6.07-.773Z"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Store unlimited passwords, unlimited devices"
          description="Cross platform access for mobile, browser, and desktop apps. Supported in over 50 languages."
          topText="CONVENIENT"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path
                fill="#30469c"
                d="M22.82 2c.52 0 1 .15 1.42.4c.23.15 5.79 3.9 5.81 10.67c0 3.144-1.202 5.716-2.485 7.564a14.916 14.916 0 0 1-2.13 3.34l-.002.003a18.495 18.495 0 0 1-1.899 1.932a17.574 17.574 0 0 1-1.976 1.627C18.352 29.821 14.498 31 10.58 31H3c-1.102 0-2-.898-2-2v-9c0-1.102.898-2 2-2h4.46c1.054 0 2.022-.56 2.543-1.468l.002-.005l5.315-9.14a3.826 3.826 0 0 1 1.949-1.712c.305-1.933 2.103-3.35 3.996-3.174A2.649 2.649 0 0 1 22.82 2m-1.068 2.723c-1.093-.657-2.619.23-2.524 1.65l.005.082c.296.055.59.16.867.315a2.868 2.868 0 0 1 1.446 2.037l.655.908c1.072 1.485 1.629 3.117 1.629 4.845c0 .208-.01.404-.02.58l-.002.046l-.001.014c-.183 2.28-2.107 4.01-4.377 4.01a2.406 2.406 0 0 1-2.092-3.579c.365-.66.738-1.292 1.105-1.91c.752-1.27 1.472-2.485 2.017-3.79l.007-.016l.044-.106a1.872 1.872 0 0 0-.894-2.163l-.005-.003a1.78 1.78 0 0 0-1.182-.21l-.291.054a1.834 1.834 0 0 0-1.073.875l-.005.01l-5.325 9.158A4.927 4.927 0 0 1 7.46 20H3v9h7.58c3.52 0 6.966-1.06 9.82-3.094l.005-.004a15.76 15.76 0 0 0 1.766-1.457l.015-.014l.015-.014a16.492 16.492 0 0 0 1.706-1.733c4.64-5.505 3.974-13.86-2.155-17.96m-1.677 10.17c-.348.59-.687 1.162-.99 1.71l-.003.007l-.004.006a.358.358 0 0 0-.048.184c0 .232.187.41.4.41c1.246 0 2.279-.944 2.382-2.157v-.003c.01-.188.018-.336.018-.49c0-.706-.124-1.398-.38-2.075c-.437.823-.915 1.631-1.375 2.409"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Protect what's important to you."
          description="Zero knowledge, end-to-end encryption guides the Bitwarden open source approach to trust, accountability, and security."
          topText="SECURE"
          svg={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  stroke="#096bec"
                  d="m37.5 29.167l6.25 2.083c0 8.333-1.292 10.625-6.25 12.5c-4.958-1.875-6.25-4.167-6.25-12.5z"
                />
                <path
                  stroke="#31469C"
                  d="M37.5 20.833V18.75a2.083 2.083 0 0 0-2.083-2.083h-6.25L25 20.833H8.333a2.083 2.083 0 0 0-2.083 2.084V37.5a2.083 2.083 0 0 0 2.083 2.083h14.584"
                />
                <path
                  stroke="#306cfe"
                  d="M29.167 16.667L25 20.833H10.417v-12.5A2.083 2.083 0 0 1 12.5 6.25h18.75a2.083 2.083 0 0 1 2.083 2.083v8.334z"
                />
              </g>
            </svg>
          }
        />
      </div>
    </div>
  );
}
