import {useLabel} from "../hooks/useLabel";
import {Link, Card, Divider, Stack, Typography} from "@mui/material";
import {Mail, Person} from "@mui/icons-material";

export default function TermsPolicyPage() {

    useLabel()?.setLabel("Terms & Policy")

    return (
        <Stack spacing={2}>
            <Typography variant="h4">Terms of Use</Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">Acceptance of the Terms of Use</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        These terms of use are entered into by and between You and fStats Dev. ("Team", "we" or "us").
                        The following terms and conditions, together with any documents they expressly incorporate by
                        reference (collectively, these "Terms of Use"), govern your access to and use of www.fstats.dev,
                        api.fstats.dev, or the fStats App, including any content, functionality and services offered on
                        or through www.fstats.dev, api.fstats.dev, or the fStats App (the "Service"), whether as a guest
                        or a registered user.
                    </Typography>
                    <Typography variant="body1">
                        Please read the Terms of Use carefully before you start to use the Service. By accessing or
                        using the Service, you accept and agree to be bound and abide by these Terms of Use, our Privacy
                        Policy. If you do not want to agree to these terms and policies, you must not access or use the
                        Service.
                    </Typography>
                    <Typography variant="body1">
                        The Service is offered and available to users who are 13 years of age or older. By using the
                        Service, you represent and warrant that you are of legal age to form a binding contract with the
                        Company and meet all of the foregoing eligibility requirements. If you do not meet all of these
                        requirements, you must not access or use the Service.
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">Changes to the Terms of Use</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        We may revise and update these Terms of Use from time to time in our sole discretion. All
                        changes are effective immediately when we post them, and apply to all access to and use of the
                        Service thereafter.
                    </Typography>
                    <Typography variant="body1">
                        Your continued use of the Service following the posting of revised Terms of Use means that you
                        accept and agree to the changes. You are expected to check this page each time you access the
                        Service so you are aware of any changes, as they are binding on you.
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">Accessing the Service and Account Security</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        We reserve the right to withdraw or amend the Service, and any service or material we provide
                        through the Service, in our sole discretion without notice. We will not be liable if for any
                        reason all or any part of the Service is unavailable at any time or for any period. From time to
                        time, we may restrict access to some parts of the Service, or the entire Service, to users,
                        including registered users.
                    </Typography>
                    <Typography variant="body1">
                        You are responsible for making all arrangements necessary for you to have access to the Service,
                        and ensuring that all persons who access the Service through your internet connection are aware
                        of these Terms of Use and comply with them.
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">Changes to the Service</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        We may update the content on the Service from time to time, but its content is not necessarily
                        complete or up-to-date. Any of the material on the Service may be out of date at any given time,
                        and we are under no obligation to update such material.
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">Privacy Policy</Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">What data do we collect?</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        1. When you create an account, we collect:
                        <ul>
                            <li>Your username</li>
                        </ul>
                        This data is used to identify you. It will be linked to your projects.
                    </Typography>
                    <Typography variant="body1">
                        2. When you send data over mod we collect:
                        <ul>
                            <li>Country name <i style={{color: "gray"}}>(If allowed)</i></li>
                            <li>Fabric API version <i style={{color: "gray"}}>(If installed)</i></li>
                            <li>Minecraft version</li>
                            <li>Mod version</li>
                            <li>Operation System <i style={{color: "gray"}}>(First letter)</i></li>
                            <li>Server online mode</li>
                        </ul>
                        This data is used to create charts and display it. It will be linked to your projects.
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">Online Privacy Policy Only</Typography>
                    <Divider/>
                    <Typography variant="body1">
                        This Privacy Policy applies only to our online activities and is valid for visitors to our
                        website with regards to the information that they shared and/or collect in fStats. This policy
                        is not applicable to any information collected offline or via channels other than this website.
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">Contact</Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Stack direction="row" spacing={2}>
                        <Person/>
                        <Link underline="none" href="https://www.linkedin.com/in/kit-lehto/">Kit Lehto</Link>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Mail/>
                        <Link underline="none" href="mailto:kit.lehto.d@gmail.com">kit.lehto.d@gmail.com</Link>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
}